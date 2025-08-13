# Changelog

## 0.2.1
- Rewrote README to focus on end-user functionality (not tutorial).
- Clarified purpose: universal word + selection counts.
- Minor description tweak for Marketplace.

## 0.2.0
- Modernized toolchain: updated to TypeScript 5.x, added @types/vscode, vsce packaging.
- Updated engines.vscode to ^1.70.0.
- Activation event changed to onStartupFinished (lighter than *).
- Added publication file whitelist and CHANGELOG.
- Added graceful error handling when word count unavailable.
- Added selection word count and support for all file types.

## 0.1.x
- Original sample implementation (markdown-only word count).
