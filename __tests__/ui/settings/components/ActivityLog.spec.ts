/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import ActivityLog from '../../../../src/ui/settings/components/ActivityLog';

describe('ActivityLog Component', () => {
  it('should be importable', () => {
    expect(ActivityLog).toBeDefined();
  });

  it('should export a connected component', () => {
    expect(typeof ActivityLog).toBe('function');
  });
});