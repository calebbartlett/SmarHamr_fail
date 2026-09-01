# SmarHamr
Perchance AI Chat Studio Dev

============================================================
FILE: index.html
TYPE: Landing Page
ROLE: Entry point for SmarHamr cockpit suite.
DESCRIPTION:
- Simple branded landing page.
- Links to CC Mode, WC Mode, and Dexie Editor.
- No Dexie data loaded here.
- Pure navigation hub.

============================================================
FILE: cc-mode.html
TYPE: Cockpit Page (Character-Centric)
ROLE: Character-focused thread builder + asset viewer.
DESCRIPTION:
- Loads persistent Dexie data from localStorage.
- Displays filename in top bar.
- Left nav: File Management + Asset Profiles.
- Workspace panels:
    - Asset Overview (Character-Centric)
    - Thread Builder (Character focus)
    - Memory Notes
    - Messages
- Mode buttons switch between CC/WC/Dexie pages.
- Uses shared config + shared CSS.

============================================================
FILE: wc-mode.html
TYPE: Cockpit Page (World-Centric)
ROLE: World-focused thread builder + asset viewer.
DESCRIPTION:
- Same persistence model as CC Mode.
- Same left nav structure.
- Workspace panels:
    - Asset Overview (World-Centric)
    - Thread Builder (World focus)
    - Memory Notes
    - Messages
- Mode buttons switch between CC/WC/Dexie pages.
- Uses shared config + shared CSS.

============================================================
FILE: dexie-editor.html
TYPE: Cockpit Page (Dexie Table Inspector)
ROLE: Inspect, edit, and modify Dexie tables directly.
DESCRIPTION:
- Loads persistent Dexie data from localStorage.
- Displays filename in top bar.
- Left nav:
    - File Management
    - Table List (instead of Asset Profiles)
- Workspace panels:
    - Selected Table Name
    - Row List
    - Row JSON Editor
- Edits rows and writes back to Dexie data.
- Saves updated Dexie data to localStorage.
- Uses shared config + shared CSS.

============================================================
FILE: smarhamr-config.js
TYPE: Global Config + Persistence Engine
ROLE: Core logic for loading, saving, exporting, and managing Dexie data.
DESCRIPTION:
- Defines SmarHamrConfig (prefixes, scratch file, debug mode).
- Provides:
    - smarhamrLoadExport()
    - smarhamrLoadScratch()
    - smarhamrExport()
    - smarhamrGetRows()
    - smarhamrSetRows()
- Persistence:
    - smarhamrSaveState() → saves Dexie + filename to localStorage.
    - smarhamrLoadState() → restores Dexie + filename from localStorage.
- UI helpers:
    - updateCurrentFileNameUI()
    - setActiveMode()

============================================================
FILE: ui.css
TYPE: Shared Cockpit Stylesheet
ROLE: Defines the entire cockpit layout.
DESCRIPTION:
- Top bar styling (filename, mode buttons, branding).
- Resizable left nav (CSS-only `resize: horizontal`).
- Workspace panel styling.
- Buttons, textareas, and asset list styling.
- Dark theme consistent across all pages.

============================================================
FILE: dexie-scratch.json
TYPE: Default Dexie Data
ROLE: Scratch fallback when no file is loaded.
DESCRIPTION:
- Loaded automatically if no persistent Dexie data exists.
- Used as a safe baseline for CC/WC/Dexie pages.
- Structure matches Perchance export format.

============================================================
FILE: (Optional future) assets/
TYPE: Asset folder
ROLE: Placeholder for future images, logos, or static resources.
DESCRIPTION:
- Currently unused.
- Reserved for future cockpit UI enhancements.

============================================================
FILE: (Optional future) scripts/
TYPE: JS folder
ROLE: For future modularization.
DESCRIPTION:
- Currently unused.
- Could hold scrubber.js, editor.js, diff.js, etc.

============================================================
FILE: (Optional future) README.md
TYPE: Documentation
ROLE: Repo-level description.
DESCRIPTION:
- Not present yet.
- Could describe cockpit architecture, persistence model, and usage.
