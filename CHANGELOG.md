# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2025-10-22

### Added
- Comprehensive component descriptions in README for all 30+ components
- Quick reference table for easy component lookup
- Detailed descriptions for form, display, interactive, and utility components
- Documentation for composables (useToast, useTypewriter)

### Changed
- Enhanced README with detailed component summaries
- Better organization of component categories

## [1.0.3] - 2025-10-22

### Removed
- Removed internal development documentation files
- Cleaned up repository to include only user-facing documentation

### Changed
- Updated .npmignore to include all documentation files in npm package
- Package now includes: README, INSTALLATION, EXAMPLES, THEME_GUIDE, ANIMATIONS, CHANGELOG

## [1.0.2] - 2025-10-22

### Changed
- Updated package.json with correct GitHub repository URLs
- Added repository, bugs, and homepage links

## [1.0.1] - 2025-10-22

### Changed
- Updated documentation to remove references to Atari ST font
- Font configuration now clearly specifies VT323 and Share Tech Mono from Google Fonts
- Removed references to FONT_INTEGRATION_GUIDE.md (not applicable)
- Simplified font documentation for clearer user experience

## [1.0.0] - 2025-10-22

### Added - Initial NPM Package Release

#### Core Features
- 30+ TUI-styled Vue 3 components with retro terminal aesthetics
- Full component library with form, display, and interactive components
- 3 built-in color themes: Amber (default), Green, Greyscale
- CRT visual effects: scanlines, flicker, glow (all toggleable)
- Global scaling system via CSS variables
- LocalStorage persistence for user preferences

#### Components
- **Form**: TuiButton, TuiInput, TuiSelect, TuiCheckbox, TuiRadio, TuiSlider, TuiDatepicker, TuiOTP
- **Display**: TuiCard, TuiText, TuiProgressBar, TuiTable, TuiTabs, TuiHeader, TuiBadge, TuiChip, TuiAvatar, TuiBanner, TuiTimeline, TuiImage, TuiIcon
- **Interactive**: TuiDialog, TuiDropdown, TuiMenubar, TuiToast, TuiTerminal, TuiTerminalTypewriter, TuiTooltip, TuiCarousel
- **Utilities**: TuiThemeSwitcher

#### Composables
- `useToast` - Toast notification system with position and severity support
- `useTypewriter` - Typewriter text effect with configurable speed

#### Distribution
- ES Module build for modern bundlers
- UMD build for browser/CDN usage
- Separate CSS file for styling
- Tree-shakeable exports
- Individual component imports supported

#### Documentation
- Installation guide (INSTALLATION.md)
- Comprehensive examples (EXAMPLES.md)
- Publishing guide (PUBLISHING.md)
- Quick start guide (NPM_QUICKSTART.md)
- Theme customization guide (THEME_GUIDE.md)
- Animation documentation (ANIMATIONS.md)

### Package Structure
- Library source in `src/`
- Demo application in `demo/`
- Build output in `dist/`
- Only essential files published to npm

### Technical Details
- Requires Vue 3.4.0 or higher as peer dependency
- Built with Vite 5
- No external runtime dependencies
- Full keyboard accessibility
- Responsive design

---

## Future Releases

### Planned for v1.1.0
- TypeScript type definitions
- Additional components (TuiTree, TuiAccordion, TuiPagination)
- Component unit tests
- A11y improvements

### Planned for v2.0.0
- Composition API refactor for better tree-shaking
- Theme system overhaul
- Custom theme builder
- Storybook documentation
- Vue 3.5+ features

---

## Release Notes Template

### [Unreleased]

#### Added
- New features go here

#### Changed
- Changes to existing functionality

#### Deprecated
- Features that will be removed in upcoming releases

#### Removed
- Features that have been removed

#### Fixed
- Bug fixes

#### Security
- Security vulnerability fixes
