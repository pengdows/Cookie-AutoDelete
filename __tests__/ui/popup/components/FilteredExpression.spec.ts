/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import FilteredExpression from '../../../../src/ui/popup/components/FilteredExpression';

describe('FilteredExpression Component', () => {
  it('should be importable', () => {
    expect(FilteredExpression).toBeDefined();
  });

  it('should export a component', () => {
    expect(typeof FilteredExpression).toBe('function');
  });
});