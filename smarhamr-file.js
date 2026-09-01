/* ============================================================
   SmarHamr File Management — Load, Reset, Save, Export
   ============================================================ */

/* ------------------------------------------------------------
   Load Export (.json or .json.gz)
   ------------------------------------------------------------ */
function smarhamrLoadExportFile(inputElId) {
    const file = document.getElementById(inputElId).files[0];
    if (!file) {
        alert("Choose a file first.");
        return;
    }

    smarhamrLoadExport(file, data => {
        window.dexieData = data;

        // Always sync filename globally
        window.currentFileName = file.name;

        updateCurrentFileNameUI();
        if (typeof renderAssets === "function") renderAssets();
        if (typeof renderTables === "function") renderTables();
    });
}

/* ------------------------------------------------------------
   Reset Scratch Dexie
   ------------------------------------------------------------ */
function smarhamrResetScratch() {
    smarhamrLoadScratch().then(data => {
        window.dexieData = data;

        // Always sync filename globally
        window.currentFileName = "Scratch Dexie";

        updateCurrentFileNameUI();
        if (typeof renderAssets === "function") renderAssets();
        if (typeof renderTables === "function") renderTables();
    });
}

/* ------------------------------------------------------------
   Save Dexie to Memory
   ------------------------------------------------------------ */
function smarhamrSaveToMemory() {
    if (!window.dexieData) {
        alert("No Dexie data loaded.");
        return;
    }

    smarhamrSaveState(window.dexieData, window.currentFileName);
    alert("Saved to memory.");
}

/* ------------------------------------------------------------
   Export Dexie (gzip)
   ------------------------------------------------------------ */
function smarhamrExportDexie() {
    if (!window.dexieData) {
        alert("No Dexie data loaded.");
        return;
    }

    const prefix = prompt("Export filename prefix:", "assets");
    smarhamrExport(prefix, window.dexieData);
}
