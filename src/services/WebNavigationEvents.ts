/**
 * Copyright (c) 2017-2022 Kenny Do and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { addExpressionUI } from '../redux/Actions';
import {
  cadLog,
  getHostname,
  getMatchedExpressions,
  getSetting,
  isAWebpage,
  localFileToRegex,
  parseCookieStoreId,
} from './Libs';
import StoreUser from './StoreUser';

type WebNavigationCommitDetails = {
  cookieStoreId?: string;
  frameId: number;
  tabId: number;
  timeStamp: number;
  transitionQualifiers?: string[];
  transitionType?: string;
  url?: string;
};

export default class WebNavigationEvents extends StoreUser {
  public static async onCommitted(
    details: WebNavigationCommitDetails,
  ): Promise<void> {
    if (!WebNavigationEvents.isTopLevel(details)) {
      return;
    }

    if (!details.url || !isAWebpage(details.url)) {
      return;
    }

    const state = StoreUser.store.getState();
    if (!(getSetting(state, SettingID.ENABLE_GREYLIST) as boolean)) {
      return;
    }

    if (
      !(getSetting(state, SettingID.GREYLIST_ON_DIRECT_VISIT) as boolean)
    ) {
      return;
    }

    if (!WebNavigationEvents.isDirectNavigation(details)) {
      return;
    }

    const hostname = getHostname(details.url);
    if (hostname === '') {
      return;
    }

    const contextualIdentities = getSetting(
      state,
      SettingID.CONTEXTUAL_IDENTITIES,
    ) as boolean;
    const cookieStoreId = await WebNavigationEvents.resolveCookieStoreId(
      contextualIdentities,
      details.tabId,
      details.cookieStoreId,
    );
    const parsedStoreId = parseCookieStoreId(
      contextualIdentities,
      cookieStoreId,
    );

    const matches = getMatchedExpressions(
      state.lists,
      parsedStoreId,
      hostname,
    );
    const hasProtection = matches.some((expression) => {
      switch (expression.listType) {
        case ListType.WHITE: {
          return true;
        }
        case ListType.GREY: {
          return true;
        }
        default: {
          return false;
        }
      }
    });

    if (hasProtection) {
      return;
    }

    StoreUser.store.dispatch<any>(
      addExpressionUI({
        expression: localFileToRegex(hostname),
        listType: ListType.GREY,
        storeId: parsedStoreId,
      }),
    );

    cadLog(
      {
        level: 2,
        msg: 'WebNavigationEvents.onCommitted: Added direct visit domain to GreyList.',
        x: {
          hostname,
          parsedStoreId,
          tabId: details.tabId,
          transitionQualifiers: details.transitionQualifiers,
          transitionType: details.transitionType,
        },
      },
      getSetting(state, SettingID.DEBUG_MODE) as boolean,
    );
  }

  protected static async resolveCookieStoreId(
    contextualIdentities: boolean,
    tabId: number,
    cookieStoreId?: string,
  ): Promise<string | undefined> {
    if (!contextualIdentities || cookieStoreId) {
      return cookieStoreId;
    }

    try {
      const tab = await browser.tabs.get(tabId);
      return tab.cookieStoreId;
    } catch (error) {
      cadLog(
        {
          level: 2,
          msg: 'WebNavigationEvents.resolveCookieStoreId: Unable to resolve cookieStoreId from tab lookup.',
          type: 'warn',
          x: { error: error instanceof Error ? error.message : error, tabId },
        },
        getSetting(StoreUser.store.getState(), SettingID.DEBUG_MODE) as boolean,
      );
      return undefined;
    }
  }

  protected static isTopLevel(details: WebNavigationCommitDetails): boolean {
    return details.frameId === 0;
  }

  protected static isDirectNavigation(
    details: WebNavigationCommitDetails,
  ): boolean {
    const qualifiers = details.transitionQualifiers || [];
    if (qualifiers.includes('from_address_bar')) {
      return true;
    }

    switch (details.transitionType) {
      case 'typed':
      case 'generated':
      case 'keyword':
      case 'keyword_generated':
      case 'auto_bookmark': {
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
