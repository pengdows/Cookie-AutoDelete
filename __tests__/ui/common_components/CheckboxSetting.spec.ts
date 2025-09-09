/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import CheckboxSetting from '../../../src/ui/common_components/CheckboxSetting';

describe('CheckboxSetting Component', () => {
  it('should be importable', () => {
    expect(CheckboxSetting).toBeDefined();
  });

  it('should export a component', () => {
    expect(typeof CheckboxSetting).toBe('function');
  });
});