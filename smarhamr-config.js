/* ============================================================
   SmarHamr Global Config
   Centralized settings for filenames, prefixes, templates,
   scratch paths, and future system-wide options.
   ============================================================ */

const SmarHamrConfig = {

    /* --------------------------------------------------------
       File Locations
       -------------------------------------------------------- */
    scratchFile: "dexie-scratch.json",

    /* --------------------------------------------------------
       Export Settings
       -------------------------------------------------------- */
    exportPrefix: "smarhamr",     // default prefix if user doesn't provide one
    exportExtension: "json.gz",   // always gzip
    timestampFormat: "YYYYMMDDhhmm",

    /* --------------------------------------------------------
       Template Filenames (future expansion)
       -------------------------------------------------------- */
    templateCharacter: "template-character.json",
    templateWorld: "template-world.json",
    templateThread: "template-thread.json",

    /* --------------------------------------------------------
       UI Settings
       -------------------------------------------------------- */
    autoLoadScratchOnStartup: true,
    debugMode: false
};


/* ============================================================
   Utility: Timestamp Builder
   ============================================================ */
function smarhamrTimestamp() {
    const now = new Date();
    return (
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0")
    );
}


/* ============================================================
   Load Scratch Dexie
   ============================================================ */
async function smarhamrLoadScratch() {
    try {
        const res = await fetch(SmarHamrConfig.scratchFile);
        const data = await res.json();
        if (SmarHamrConfig.debugMode) console.log("Scratch loaded:", data);
        return data;
    } catch (err) {
        console.error("Failed to load scratch Dexie:", err);
        throw err;
    }
}


/* ============================================================
   Load Dexie Export (JSON)
   ============================================================ */
function smarhamrLoadExport(file, callback) {
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);
            if (SmarHamrConfig.debugMode) console.log("Export loaded:", data);
            callback(data);
        } catch (err) {
            alert("Invalid JSON export.");
            console.error(err);
        }
    };
    reader.readAsText(file);
}


/* ============================================================
   Export Dexie (raw JSON → gzip)
   ============================================================ */
function smarhamrExport(prefix, dexieData) {
    if (!dexieData) {
        alert("No Dexie data loaded.");
        return;
    }

    const userPrefix = prefix && prefix.trim().length > 0
        ? prefix.trim()
        : SmarHamrConfig.exportPrefix;

    const timestamp = smarhamrTimestamp();
    const filename = `${userPrefix}.${SmarHamrConfig.exportPrefix}.${timestamp}.${SmarHamrConfig.exportExtension}`;

    // RAW JSON (no pretty formatting)
    const rawJson = JSON.stringify(dexieData);

    // GZIP (requires pako.js)
    const gzipped = pako.gzip(rawJson);

    const blob = new Blob([gzipped], { type: "application/gzip" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}


/* ============================================================
   Helper: Get Table Rows
   ============================================================ */
function smarhamrGetRows(dexieData, tableName) {
    if (!dexieData || !dexieData.data || !dexieData.data.data) return [];
    const table = dexieData.data.data.find(t => t.tableName === tableName);
    return table ? table.rows || [] : [];
}


/* ============================================================
   Helper: Write Table Rows
   ============================================================ */
function smarhamrSetRows(dexieData, tableName, rows) {
    const table = dexieData.data.data.find(t => t.tableName === tableName);
    if (table) {
        table.rows = rows;
    }
}
