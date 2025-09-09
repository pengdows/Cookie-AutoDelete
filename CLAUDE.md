# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Run webpack watcher for development (watches TypeScript files and rebuilds automatically)
- `npm run compile` - Compile TypeScript with webpack
- `npm run build` - Full build process (compile + package extension files)
- `npm run lint` - Run ESLint on TypeScript files in src/
- `npm test` - Run Jest test suite with coverage
- `npm run test-all` - Run both tests and linting

## Architecture Overview

Cookie AutoDelete is a browser extension (WebExtension) that automatically manages cookies. The codebase is fully compliant with **Manifest V3 standards** for both Firefox and Chrome. The codebase is built with:

### Technology Stack
- **TypeScript** for type safety
- **React + Redux** for UI components and state management  
- **Webpack** for bundling
- **Jest** for testing
- **ESLint** for linting

### Directory Structure
- `src/` - Main source code
  - `background.ts` - Extension background script (main entry point)
  - `services/` - Core business logic services
  - `redux/` - State management (Store, Actions, Reducers)
  - `ui/` - React components for popup and settings pages
  - `typings/` - TypeScript type definitions
- `extension/` - Built extension files (output directory)
- `__tests__/` - Test files
- `tools/` - Build utilities

### Key Services
- `CleanupService` - Handles cookie deletion logic
- `CookieEvents` - Manages cookie change events
- `TabEvents` - Handles tab lifecycle events
- `SettingService` - Manages extension settings
- `BrowserActionService` - Controls extension icon and badge

### State Management
Uses Redux with `redux-webext` for cross-context state sharing between background script, popup, and settings pages. State includes:
- Settings configuration
- Whitelist/greylist expressions
- Activity logs
- Cache data

### Extension Structure
- **Background Script**: `src/background.ts` - Main extension logic using service worker pattern
- **Popup**: `src/ui/popup/` - Browser action popup interface
- **Settings Page**: `src/ui/settings/` - Extension options page
- **Manifest**: Uses Manifest V3 format with cross-browser compatibility
  - Chrome minimum version: 88+
  - Firefox minimum version: 127+
  - Uses unified `action` API instead of legacy `browserAction`/`pageAction`
  - Modern `browser_specific_settings` instead of deprecated `applications`

### Build Process
1. TypeScript compilation via webpack
2. Bundles created for background, popup, and settings
3. Extension files copied to `/extension` directory
4. `buildFilesDev.js` creates platform-specific builds (Chrome .zip, Firefox .xpi)

## Testing

Tests are located in `__tests__/` directory using Jest. Run individual test files with:
```bash
npx jest __tests__/path/to/test.spec.ts
```

Coverage reports are generated in the `coverage/` directory.