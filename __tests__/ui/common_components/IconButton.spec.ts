/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import IconButton from '../../../src/ui/common_components/IconButton';

describe('IconButton Component', () => {
  it('should be importable', () => {
    expect(IconButton).toBeDefined();
  });

  it('should export a component class', () => {
    expect(typeof IconButton).toBe('function');
  });

  it('should have render method', () => {
    const instance = new IconButton({
      iconName: ['fas', 'test'],
      className: 'test'
    });
    expect(typeof instance.render).toBe('function');
  });
});