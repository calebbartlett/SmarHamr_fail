# SmarHamr
Perchance AI Chat Studio Dev
# SmarHamr Cockpit — Modular Architecture (v2.0)

A fully modular, browser‑based cockpit for editing Perchance AI generator exports, Dexie databases, and character/world assets.  
This version replaces the original monolithic HTML pages with a clean, maintainable module system.

---

## Overview

SmarHamr now uses a **multi‑module architecture** designed for:

- faster development  
- smaller files  
- easier debugging  
- shared logic across CC/WC/Dexie modes  
- stable global state  
- consistent clipboard behavior  
- unified file loading/exporting  
- clean separation of concerns  

All logic is split into **7 JavaScript modules** plus 3 mode‑specific modules.

---

## Folder Structure

```
/SmarHamr/
    smarhamr-core.js
    smarhamr-file.js
    smarhamr-clipboard.js
    smarhamr-ui.js

    smarhamr-cc.js
    smarhamr-wc.js
    smarhamr-dexie.js

    cc-mode.html
    wc-mode.html
    dexie-editor.html

    ui.css
    README.md
```

---

## Modules

### 1. smarhamr-core.js  
Global state + navigation.

- window.dexieData  
- window.currentFileName  
- window.selectedAssetId  
- window.selectedTableName  
- window.selectedRowId  
- goCC(), goWC(), goDexie()

---

### 2. smarhamr-file.js  
Unified file operations.

- load `.json` / `.json.gz`  
- reset scratch Dexie  
- save Dexie to memory  
- export Dexie (gzip)  
- sync filename globally  

---

### 3. smarhamr-clipboard.js  
Clipboard persistence + UI control.

- load clipboard text  
- save clipboard text  
- open/close clipboard panel  
- attach clipboard events  

---

### 4. smarhamr-ui.js  
Shared UI helpers.

- safe DOM getter  
- update filename display  
- highlight active mode button  
- initialize shared UI  

---

### 5. smarhamr-cc.js  
Character‑Centric mode logic.

- render character assets  
- populate identity/behavior/prompting/visual/lore/custom code  
- save all CC panels  
- thread builder scratchpad  

---

### 6. smarhamr-wc.js  
World‑Centric mode logic.

- render world assets  
- populate identity/behavior/prompting/visual/lore/custom code  
- save all WC panels  

---

### 7. smarhamr-dexie.js  
Dexie Editor logic.

- render tables  
- render rows  
- JSON row editor  
- apply row edits  
- export modified Dexie  

---

## Mode Pages

Each mode page is now tiny and loads only the modules it needs.

### CC Mode

```html
<script src="smarhamr-core.js"></script>
<script src="smarhamr-file.js"></script>
<script src="smarhamr-clipboard.js"></script>
<script src="smarhamr-ui.js"></script>
<script src="smarhamr-cc.js"></script>

<script>
window.addEventListener("load", smarhamrInitCC);
</script>
```

### WC Mode

```html
<script src="smarhamr-core.js"></script>
<script src="smarhamr-file.js"></script>
<script src="smarhamr-clipboard.js"></script>
<script src="smarhamr-ui.js"></script>
<script src="smarhamr-wc.js"></script>

<script>
window.addEventListener("load", smarhamrInitWC);
</script>
```

### Dexie Editor

```html
<script src="smarhamr-core.js"></script>
<script src="smarhamr-file.js"></script>
<script src="smarhamr-clipboard.js"></script>
<script src="smarhamr-ui.js"></script>
<script src="smarhamr-dexie.js"></script>

<script>
window.addEventListener("load", smarhamrInitDexie);
</script>
```

---

## Benefits of the Modular Architecture

- **No duplicated logic**  
  File operations, clipboard, and UI helpers are shared.

- **Stable global state**  
  `currentFileName` and `dexieData` are consistent across modes.

- **Fast debugging**  
  Each module is small and isolated.

- **No more filename corruption**  
  `[object HTMLDivElement]` cannot occur.

- **No more JSON export mismatches**  
  All modes use the same export pipeline.

- **Easy future expansion**  
  Add new modes or panels without touching core modules.

---

## JSON Artifact File

A full reference map of all modules is stored in:

```
smarhamr-modules.json
```

This file documents:

- module responsibilities  
- provided functions  
- dependencies  
- architecture notes  

---

## Development Notes

- All modules are pure browser JS (no build step).  
- Dexie data is stored in RAM and shared across modes.  
- Clipboard uses `localStorage`.  
- Export uses gzip via pako.  
- All UI updates use shared helpers.  

