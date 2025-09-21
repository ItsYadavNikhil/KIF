# KIF (Knowledge is Free) Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from educational platforms like Notion and Linear for clean, minimal interfaces that prioritize content and usability. The design emphasizes simplicity and focus to support student learning workflows.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Blue: 220 85% 35% (deep blue from logo)
- Brand Accent: 200 70% 50% (lighter blue complement)
- Background: 0 0% 98% (light mode), 220 15% 8% (dark mode)
- Text: 220 25% 15% (light mode), 0 0% 90% (dark mode)

**Functional Colors:**
- Success: 142 76% 36% (approval states)
- Warning: 38 92% 50% (pending reviews)
- Error: 0 84% 60% (rejections)
- Neutral: 220 15% 60% (secondary text)

### B. Typography
**Primary Font:** Inter (Google Fonts)
- Headings: 600-700 weight, varied sizes
- Body: 400-500 weight, 16px base
- UI Elements: 500 weight, 14px

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12
- Tight spacing: p-2, m-2 (components)
- Standard spacing: p-4, m-4 (cards, sections)
- Generous spacing: p-8, m-8 (page layouts)

### D. Component Library

**Navigation:**
- Clean header with KIF logo (left), navigation items (center), user avatar (right)
- Minimal sidebar for admin sections
- Breadcrumb navigation for deep sections

**Cards & Content:**
- Rounded corners (rounded-lg)
- Subtle shadows (shadow-sm)
- Clean borders in neutral colors
- PDF preview cards with file icons and metadata

**Forms:**
- Drag-and-drop PDF upload zone with dashed borders
- Clean input fields with focus states
- File size indicators (25MB max clearly displayed)
- Progress indicators for uploads

**Buttons:**
- Primary: Filled with brand blue
- Secondary: Outline with brand blue border
- Ghost: Text-only for less important actions
- AI Chat: Floating circular button (bottom-right) with chat icon

**Data Displays:**
- Clean tables for admin approval workflows
- Grid layouts for note galleries
- Status badges for verification states
- Minimal loading states

### E. Key Screens & Features

**Splash Screen:**
- Centered KIF logo on clean background
- Subtle animation or fade-in effect
- Minimal branding text

**Student Dashboard:**
- Card-based layout showing account status
- Upload area prominently displayed
- Recently uploaded notes grid

**Notes Gallery:**
- Clean grid of PDF previews
- Filter/search by subject
- Download functionality clearly indicated

**Admin Interface:**
- Queue-based approval workflow
- Side-by-side preview and action panels
- Bulk action capabilities

**AI Chat Integration:**
- Fixed position floating button (bottom-right corner)
- Prepared for future OpenAI integration
- Subtle hover states, no active interactions on outline variants

### F. Visual Principles
- **Minimal & Clean:** Generous whitespace, focused content areas
- **Student-Friendly:** Approachable colors, clear hierarchy
- **Functional:** Every element serves the learning workflow
- **Accessible:** High contrast ratios, clear focus states
- **Consistent:** Unified spacing, typography, and interaction patterns

### G. File Upload Specifications
- PDF files only (clearly indicated in UI)
- 25MB maximum file size with clear warnings
- Drag-and-drop with visual feedback
- Progress indicators during upload
- Error handling for size/format violations