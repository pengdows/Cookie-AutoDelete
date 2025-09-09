# GitHub Actions CI/CD

This directory contains automated workflows for the Cookie AutoDelete extension.

## Workflows

### 🔄 CI/CD Pipeline (`ci.yml`)
**Triggers:** Push to main branches, Pull Requests, Releases

**Jobs:**
- **Test & Lint:** Runs on Node.js 18.x and 20.x
  - Installs dependencies
  - Runs ESLint
  - Executes Jest tests with coverage
  - Uploads coverage to Codecov
- **Build:** Creates extension bundles
  - Builds Chrome and Firefox versions
  - Uploads build artifacts
- **Build Packages:** Creates distribution packages (.zip/.xpi)
  - Only runs on releases or main branch
  - Creates downloadable packages
  - Attaches to GitHub releases
- **Security Audit:** Checks for vulnerabilities

### 🔍 Pull Request Checks (`pr-checks.yml`)
**Triggers:** Pull Request events

**Jobs:**
- **PR Validation:** Comprehensive validation
  - Security audit
  - Build verification  
  - Extension structure validation
- **Security Scan:** Advanced security checks
  - Scans for sensitive files
  - Detects hardcoded secrets
- **Size Check:** Bundle size comparison
  - Compares bundle sizes vs base branch
  - Warns on significant size increases

### 🔧 Maintenance (`maintenance.yml`)
**Triggers:** Weekly schedule (Sundays), Manual dispatch

**Jobs:**
- **Dependency Update:** Weekly security scans
  - Checks for vulnerabilities
  - Creates issues if problems found
- **Performance Check:** Bundle analysis
  - Monitors build output sizes

### 🚀 Release (`release.yml`)
**Triggers:** Version tags (`v*`), Manual dispatch

**Jobs:**
- **Create Release:** Generates GitHub release
  - Auto-generates release notes
  - Handles pre-releases
- **Build and Upload:** Creates and uploads packages
  - Runs full test suite
  - Creates Chrome (.zip) and Firefox (.xpi) packages
  - Generates SHA256 checksums

## Artifacts

The workflows generate several artifacts:

### Build Artifacts
- `cookie-autodelete-chrome-{sha}` - Chrome extension files
- `cookie-autodelete-firefox-{sha}` - Firefox extension files

### Release Packages
- `cookie-autodelete-chrome.zip` - Chrome Web Store package
- `cookie-autodelete-firefox.xpi` - Firefox Add-ons package
- `checksums.txt` - SHA256 hashes for verification

## Configuration

### Secrets Required
No secrets are currently required. The workflows use:
- `GITHUB_TOKEN` (automatically provided)

### Branch Protection
Recommended branch protection rules:
- Require PR reviews
- Require status checks to pass
- Include administrators
- Restrict pushes to main branches

## Local Testing

To test builds locally:

```bash
# Install dependencies
npm ci

# Run tests and linting
npm run test-all

# Build extension
npm run build

# Check output
ls -la extension/
ls -la builds/
```

## Monitoring

- **Coverage:** Reports uploaded to Codecov
- **Security:** Weekly vulnerability scans  
- **Performance:** Bundle size tracking
- **Quality:** ESLint and TypeScript checks

## Troubleshooting

### Common Issues

1. **Build Failures:** Check TypeScript compilation errors
2. **Test Failures:** Often related to dependency updates
3. **Security Alerts:** Review npm audit output
4. **Size Warnings:** Monitor bundle size increases

### Debugging Workflows

1. Check workflow run logs in Actions tab
2. Download artifacts to inspect build output
3. Compare successful runs with failed ones
4. Use workflow dispatch for manual testing