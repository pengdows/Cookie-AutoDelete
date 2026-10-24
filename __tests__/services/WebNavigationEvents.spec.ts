/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
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

import { Store } from 'redux';

import { updateSetting } from '../../src/redux/Actions';
import { initialState } from '../../src/redux/State';
// tslint:disable-next-line: import-name
import createStore from '../../src/redux/Store';
import WebNavigationEvents from '../../src/services/WebNavigationEvents';
import StoreUser from '../../src/services/StoreUser';
import { ReduxAction, ReduxConstants } from '../../src/typings/ReduxConstants';

class TestStore extends StoreUser {
  public static resetAll() {
    StoreUser.store.dispatch({
      type: ReduxConstants.RESET_ALL,
    });
  }

  public static getLists() {
    return StoreUser.store.getState().lists;
  }

  public static changeSetting(name: SettingID, value: Setting['value']) {
    StoreUser.store.dispatch(updateSetting({ name, value }));
  }
}

const store: Store<State, ReduxAction> = createStore(initialState);
StoreUser.init(store);

describe('WebNavigationEvents', () => {
  beforeEach(() => {
    TestStore.resetAll();
  });

  it('should add a greylist entry when visiting directly', async () => {
    TestStore.changeSetting(SettingID.GREYLIST_ON_DIRECT_VISIT, true);

    const details: any = {
      frameId: 0,
      tabId: 1,
      timeStamp: Date.now(),
      transitionQualifiers: [],
      transitionType: 'typed',
      url: 'https://example.com',
    };

    await WebNavigationEvents.onCommitted(details);

    const lists = TestStore.getLists();
    expect(lists.default).toHaveLength(1);
    expect(lists.default?.[0].expression).toEqual('example.com');
    expect(lists.default?.[0].listType).toEqual(ListType.GREY);
  });

  it('should ignore navigations that are not direct visits', async () => {
    TestStore.changeSetting(SettingID.GREYLIST_ON_DIRECT_VISIT, true);

    const details: any = {
      frameId: 0,
      tabId: 2,
      timeStamp: Date.now(),
      transitionQualifiers: [],
      transitionType: 'link',
      url: 'https://ignore-me.example',
    };

    await WebNavigationEvents.onCommitted(details);

    const lists = TestStore.getLists();
    expect(lists.default).toBeUndefined();
  });

  it('should ignore direct visits when the feature is disabled', async () => {
    const details: any = {
      frameId: 0,
      tabId: 3,
      timeStamp: Date.now(),
      transitionQualifiers: [],
      transitionType: 'typed',
      url: 'https://disabled.example',
    };

    await WebNavigationEvents.onCommitted(details);

    const lists = TestStore.getLists();
    expect(lists.default).toBeUndefined();
  });
});
