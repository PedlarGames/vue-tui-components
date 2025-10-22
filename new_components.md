# New Components for TUI Library

This document outlines the new components to be added to the TUI library. Each component should follow the design principles and coding standards of the library. Below are the components and their descriptions to guide development:

## Components

### Tooltip

- **Description**: A small pop-up box that provides additional information when a user hovers over or focuses on an element.

- **Features**:
  - Customizable position (top, bottom, left, right).
  - Support for rich text and icons.
  - Smooth fade-in and fade-out animations.

### Dialog

- **Description**: A modal window that captures user attention for critical tasks or information.

- **Features**:
  - Header, body, and footer sections.
  - Support for actions like confirm and cancel.
  - Overlay with customizable opacity.

### Chip

- **Description**: A compact element representing an input, attribute, or action.

- **Features**:
  - Closable option.
  - Support for icons and avatars.
  - Customizable colors and sizes.

### OTP

- **Description**: A component for entering one-time passwords, typically used in authentication flows.

- **Features**:
  - Support for multiple input fields.
  - Auto-focus and seamless navigation between fields.
  - Validation and masking options.

### Slider

- **Description**: A control for selecting a value or range within a defined range.

- **Features**:
  - Horizontal and vertical orientations.
  - Customizable steps and range.
  - Support for tooltips displaying current value.

### Carousel

- **Description**: A rotating slider for showcasing images or content.

- **Features**:
  - Auto-play and manual navigation.
  - Support for indicators and captions.
  - Smooth transition animations.

### Badge

- **Description**: A small indicator for notifications or status.

- **Features**:
  - Customizable colors and sizes.
  - Support for icons and numbers.
  - Placement options (top-right, bottom-left, etc.).

### Banner

- **Description**: A prominent message bar for displaying important information.

- **Features**:
  - Support for actions like dismiss and links.
  - Customizable background and text colors.
  - Icons for additional context.

### Timeline

- **Description**: A vertical or horizontal list of events in chronological order.

- **Features**:
  - Support for icons and timestamps.
  - Customizable styles for milestones.
  - Interactive elements like tooltips.

### Avatar

- **Description**: A visual representation of a user or entity.

- **Features**:
  - Support for images, initials, and icons.
  - Customizable sizes and shapes (circle, square).
  - Status indicators (online, offline, etc.).

### Icon

- **Description**: A graphical representation of an action or concept.

- **Features**:
  - Support for a wide range of icons.
  - Customizable sizes and colors.
  - Accessibility support with ARIA labels.

### Image

- **Description**: A component for displaying images with additional features.

- **Features**:
  - Lazy loading support.
  - Customizable aspect ratios.
  - Overlays and captions.

### Datepicker

- **Description**: A component for selecting dates from a calendar view.

- **Features**:
  - Support for single and range selection.
  - Customizable date formats.
  - Integration with time pickers.

## Development Guidelines

1. **Consistency**: Ensure the components align with the existing design system and coding standards.
2. **Accessibility**: Follow best practices to make components accessible to all users.
3. **Customization**: Provide options for developers to customize styles and behaviors.
4. **Performance**: Optimize components for fast rendering and minimal resource usage.
5. **Testing**: Include unit and integration tests to ensure reliability.

Refer to the `README.md` and `THEME_GUIDE.md` for additional details on the library's design principles and implementation standards.
