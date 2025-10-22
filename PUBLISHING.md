# Publishing Guide

## Pre-publish Checklist

1. **Update Version**
   - Update version in `package.json`
   - Follow semantic versioning (MAJOR.MINOR.PATCH)

2. **Build the Library**
   ```bash
   npm run build:lib
   ```

3. **Test Locally**
   - Use `npm link` to test in another project
   ```bash
   # In this project
   npm link
   
   # In another Vue project
   npm link vue-tui-components
   ```

4. **Update Documentation**
   - Update CHANGELOG.md with changes
   - Update README.md if needed
   - Verify all examples work

5. **Commit and Tag**
   ```bash
   git add .
   git commit -m "Release v1.0.0"
   git tag v1.0.0
   git push origin main --tags
   ```

## Publishing to npm

### First Time Setup

1. Create an npm account at https://www.npmjs.com/signup
2. Login via CLI:
   ```bash
   npm login
   ```

### Publish

```bash
npm publish
```

### Publish a Beta Version

```bash
npm publish --tag beta
```

## After Publishing

1. **Verify Package**
   - Visit: https://www.npmjs.com/package/vue-tui-components
   - Test installation in a new project:
   ```bash
   npm install vue-tui-components
   ```

2. **Create GitHub Release**
   - Go to GitHub releases
   - Create a new release with the tag
   - Add release notes

## Updating the Package

1. Make your changes
2. Update version in package.json (follow semver)
3. Build: `npm run build:lib`
4. Commit and tag
5. Publish: `npm publish`

## Version Guidelines (Semantic Versioning)

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

## Unpublishing

⚠️ Only unpublish if absolutely necessary (within 72 hours of publish)

```bash
npm unpublish vue-tui-components@<version>
```

## Package Scope (Optional)

To publish under a scope (e.g., @yourname/vue-tui-components):

1. Update package.json name: `"name": "@yourname/vue-tui-components"`
2. Publish with access flag:
   ```bash
   npm publish --access public
   ```
