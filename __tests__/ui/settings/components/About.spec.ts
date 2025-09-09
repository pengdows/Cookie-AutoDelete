/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import About from '../../../../src/ui/settings/components/About';

describe('About Component', () => {
  it('should be importable', () => {
    expect(About).toBeDefined();
  });

  it('should export a connected component', () => {
    expect(typeof About).toBe('function');
  });
});