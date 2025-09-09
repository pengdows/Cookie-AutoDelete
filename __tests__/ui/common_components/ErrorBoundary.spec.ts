/**
 * Copyright (c) 2020-2022 Kenneth Tran and CAD Team (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/graphs/contributors)
 * Licensed under MIT (https://github.com/Cookie-AutoDelete/Cookie-AutoDelete/blob/3.X.X-Branch/LICENSE)
 */

import ErrorBoundary from '../../../src/ui/common_components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('should be importable', () => {
    expect(ErrorBoundary).toBeDefined();
  });

  it('should export a connected component', () => {
    expect(typeof ErrorBoundary).toBe('function');
  });

  it('should have getDerivedStateFromError static method', () => {
    // ErrorBoundary is wrapped with connect, so we need to access WrappedComponent
    const WrappedComponent = (ErrorBoundary as any).WrappedComponent;
    expect(WrappedComponent.getDerivedStateFromError).toBeDefined();
    expect(typeof WrappedComponent.getDerivedStateFromError).toBe('function');
  });

  it('should handle state undefined error correctly', () => {
    const WrappedComponent = (ErrorBoundary as any).WrappedComponent;
    
    const error = new Error('state is undefined');
    const result = WrappedComponent.getDerivedStateFromError(error);
    expect(result.hasError).toBe(false);
  });

  it('should handle other errors correctly', () => {
    const WrappedComponent = (ErrorBoundary as any).WrappedComponent;
    
    const error = new Error('some other error');
    const result = WrappedComponent.getDerivedStateFromError(error);
    expect(result.hasError).toBe(true);
    expect(result.error).toBe(error);
  });
});