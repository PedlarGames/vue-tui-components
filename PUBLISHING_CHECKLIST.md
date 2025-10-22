# Before Publishing Checklist

Complete these steps before publishing to npm:

## 1. Update Package Information

Edit `package.json` and update:

```json
{
  "name": "vue-tui-components", // Change if needed or add scope: @yourname/vue-tui-components
  "version": "1.0.0",
  "description": "TUI-styled Vue3 components with Pip-Boy aesthetics - retro terminal UI components for Vue 3",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/vue-tui-components.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/vue-tui-components/issues"
  },
  "homepage": "https://github.com/yourusername/vue-tui-components#readme"
}
```

## 2. Check Package Name Availability

```bash
npm search vue-tui-components
```

If taken, consider:
- Adding a scope: `@yourname/vue-tui-components`
- Different name: `vue-tui-kit`, `vue-terminal-ui`, etc.

## 3. Test Build

```bash
npm run build:lib
```

Verify `dist/` contains:
- `vue-tui-components.es.js`
- `vue-tui-components.umd.js`
- `vue-tui-components.css`

## 4. Test Locally

```bash
# In this project
npm link

# In a test Vue 3 project
npm link vue-tui-components
```

Then in test project:

```javascript
import VueTuiComponents from 'vue-tui-components'
import 'vue-tui-components/dist/style.css'
```

## 5. Verify .npmignore

Make sure only these are published:
- ✅ `dist/` folder
- ✅ `src/` folder  
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `package.json`

Excluded:
- ❌ `demo/` folder
- ❌ `node_modules/`
- ❌ Documentation (except README)
- ❌ Config files

Test with:
```bash
npm pack --dry-run
```

## 6. Create Git Repository (if not done)

```bash
git init
git add .
git commit -m "Initial commit - v1.0.0"
git branch -M main
git remote add origin https://github.com/yourusername/vue-tui-components.git
git push -u origin main
```

## 7. Create Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 8. NPM Login

```bash
npm login
```

Enter your credentials:
- Username
- Password
- Email
- 2FA code (if enabled)

## 9. Publish!

```bash
npm publish
```

For scoped packages (first time):
```bash
npm publish --access public
```

## 10. Verify Publication

1. Visit: https://www.npmjs.com/package/vue-tui-components
2. Test install in fresh project:
   ```bash
   npm create vue@latest test-project
   cd test-project
   npm install vue-tui-components
   ```

## 11. Create GitHub Release

1. Go to: https://github.com/yourusername/vue-tui-components/releases
2. Click "Create a new release"
3. Choose tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Copy from CHANGELOG.md
6. Publish release

## Common Issues

### "Package name already taken"
- Add scope: `@yourname/vue-tui-components`
- Choose different name
- Contact npm support if you own the name

### "No permission to publish"
- Make sure you're logged in: `npm whoami`
- Check package name doesn't conflict with existing package you don't own

### "Version already published"
- Update version in package.json
- Version must be higher than existing versions

### Files missing in published package
- Check `.npmignore`
- Use `npm pack` to test locally
- Ensure files are committed to git

## Post-Publish

### Update README badge

Add to top of README.md:
```markdown
[![npm version](https://badge.fury.io/js/vue-tui-components.svg)](https://www.npmjs.com/package/vue-tui-components)
[![npm downloads](https://img.shields.io/npm/dm/vue-tui-components.svg)](https://www.npmjs.com/package/vue-tui-components)
```

### Share the package!
- Twitter/X
- Reddit (r/vuejs)
- Dev.to
- Your blog
- Vue.js Discord

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run demo |
| `npm run build:lib` | Build library |
| `npm link` | Test locally |
| `npm publish` | Publish to npm |
| `npm version patch` | Bump version (1.0.0 → 1.0.1) |
| `npm version minor` | Bump version (1.0.0 → 1.1.0) |
| `npm version major` | Bump version (1.0.0 → 2.0.0) |

---

**Ready to publish?** Follow the steps above! 🚀
