/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import CleanDataButton from '../../../../src/ui/popup/components/CleanDataButton';

describe('CleanDataButton Component', () => {
  it('should be importable', () => {
    expect(CleanDataButton).toBeDefined();
  });

  it('should export a connected component', () => {
    expect(typeof CleanDataButton).toBe('function');
  });
});