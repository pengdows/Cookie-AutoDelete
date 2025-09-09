/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import SelectInput from '../../../src/ui/common_components/SelectInput';

describe('SelectInput Component', () => {
  it('should be importable', () => {
    expect(SelectInput).toBeDefined();
  });

  it('should export a component', () => {
    expect(typeof SelectInput).toBe('function');
  });
});