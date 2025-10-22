# TUI Menubar & Dropdown Components

This document describes the new menubar and dropdown components added to the TUI theme system.

## Components

### TuiDropdown

A reusable dropdown component with TUI styling that can be used standalone or as part of other components.

#### Props
- `label` (String): Default label text for the trigger
- `items` (Array, required): Array of menu items to display
- `disabled` (Boolean): Disables the dropdown
- `align` ('left' | 'right'): Horizontal alignment of the dropdown menu

#### Item Structure
```javascript
{
  id: 'unique-id',           // Unique identifier
  label: 'Menu Item',        // Display text
  icon: '●',                 // Optional icon character
  shortcut: 'Ctrl+S',        // Optional keyboard shortcut display
  disabled: false,           // Optional disabled state
  separator: false,          // If true, renders as a separator line
  submenu: [],              // Optional array of sub-items (not fully implemented yet)
  action: () => {}          // Optional callback function
}
```

#### Events
- `item-click`: Emitted when an item is clicked, passes the item object
- `open`: Emitted when dropdown opens
- `close`: Emitted when dropdown closes

#### Slots
- `trigger`: Custom trigger content (receives `{ isOpen }` slot prop)

#### Methods (via ref)
- `open()`: Opens the dropdown
- `close()`: Closes the dropdown
- `toggle()`: Toggles dropdown state

#### Example
```vue
<TuiDropdown :items="menuItems" @item-click="handleClick">
  <template #trigger="{ isOpen }">
    <button :class="{ active: isOpen }">Menu</button>
  </template>
</TuiDropdown>
```

### TuiMenubar

A horizontal menubar component typical of desktop applications, built using TuiDropdown.

#### Props
- `menus` (Array, required): Array of menu objects
- `compact` (Boolean): Use compact styling with reduced padding

#### Menu Structure
```javascript
{
  id: 'file',               // Unique identifier
  label: 'File',            // Menu label
  items: []                 // Array of menu items (same structure as TuiDropdown items)
}
```

#### Events
- `menu-item-click`: Emitted when any menu item is clicked, passes the item object

#### Slots
- `right`: Content to display on the right side of the menubar (e.g., status text)

#### Example
```vue
<TuiMenubar :menus="appMenus" @menu-item-click="handleMenuAction">
  <template #right>
    <span>STATUS: READY</span>
  </template>
</TuiMenubar>

<script setup>
const appMenus = [
  {
    id: 'file',
    label: 'File',
    items: [
      { id: 'new', label: 'New', icon: '+', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open', icon: '○', shortcut: 'Ctrl+O' },
      { separator: true },
      { id: 'exit', label: 'Exit', icon: '✕' }
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    items: [
      { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
      { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' }
    ]
  }
]

const handleMenuAction = (item) => {
  console.log('Menu action:', item)
  // Handle menu item click
}
</script>
```

## Features

### TUI Styling
- Uses CSS variables for consistent theming
- Glowing borders and text effects
- Terminal-style appearance with retro aesthetics
- Smooth transitions and animations

### Keyboard Navigation
- Arrow keys to navigate items
- Enter/Space to open/select
- Escape to close
- Tab for focus management

### Accessibility
- Proper focus management
- Keyboard shortcuts display
- Disabled state support
- ARIA-compliant structure

### Smart Positioning
- Automatically positions dropdowns to stay within viewport
- Adjusts for horizontal and vertical overflow
- Supports left/right alignment
- Uses Teleport for proper z-index stacking

### Responsive
- Works on mobile and desktop
- Touch-friendly click areas
- Wraps on small screens
- Scrollable menu content

## Styling Customization

All components use CSS variables from the TUI theme system:
- `--tui-bg`: Background color
- `--tui-bg-light`: Light background
- `--tui-border`: Border color
- `--tui-primary`: Primary accent color
- `--tui-text`: Text color
- `--tui-text-dim`: Dimmed text color
- `--tui-glow`: Text glow effect
- `--tui-primary-transparent-XX`: Semi-transparent primary colors

## Click-Outside Detection

Both components handle click-outside events to close dropdowns when clicking elsewhere on the page.

## Future Enhancements

Potential improvements:
- Submenu support (cascading menus)
- Context menu variant
- Menu divider styling variants
- Icon component integration
- More animation options
- Sound effects on open/close
