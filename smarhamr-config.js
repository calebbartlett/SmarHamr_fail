/* ============================================================
   SmarHamr Config — Core Dexie + JSON + Gzip Utilities
   ============================================================ */

/* ------------------------------------------------------------
   Load Export (.json or .json.gz)
   ------------------------------------------------------------ */
function smarhamrLoadExport(file, callback) {
    const reader = new FileReader();

    reader.onload = async function (e) {
        let raw = e.target.result;

        try {
            let jsonText;

            // GZIP?
            if (file.name.endsWith(".gz")) {
                const compressed = new Uint8Array(raw);
                const decompressed = pako.inflate(compressed, { to: "string" });
                jsonText = decompressed;
            } else {
                jsonText = raw;
            }

            const parsed = JSON.parse(jsonText);
            callback(parsed);

        } catch (err) {
            console.error("LoadExport error:", err);
            alert("Invalid JSON or GZIP file.");
        }
    };

    if (file.name.endsWith(".gz")) {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
}

/* ------------------------------------------------------------
   Load Scratch Dexie (empty template)
   ------------------------------------------------------------ */
function smarhamrLoadScratch() {
    return new Promise(resolve => {
        resolve({
            characters: [],
            worlds: [],
            loreBooks: [],
            memories: [],
            threads: []
        });
    });
}

/* ------------------------------------------------------------
   Save Dexie to localStorage
   ------------------------------------------------------------ */
function smarhamrSaveState(data, filename) {
    try {
        const json = JSON.stringify(data);
        localStorage.setItem("smarhamrState", json);
        localStorage.setItem("smarhamrStateFilename", filename);
    } catch (err) {
        console.error("SaveState error:", err);
        alert("Failed to save state.");
    }
}

/* ------------------------------------------------------------
   Load Dexie from localStorage
   ------------------------------------------------------------ */
function smarhamrLoadState() {
    try {
        const json = localStorage.getItem("smarhamrState");
        if (!json) return null;
        return JSON.parse(json);
    } catch (err) {
        console.error("LoadState error:", err);
        return null;
    }
}

/* ------------------------------------------------------------
   Export Dexie (gzip)
   ------------------------------------------------------------ */
function smarhamrExport(prefix, data) {
    try {
        const json = JSON.stringify(data, null, 2);
        const compressed = pako.gzip(json);

        const blob = new Blob([compressed], { type: "application/gzip" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = prefix + ".json.gz";
        a.click();

        URL.revokeObjectURL(url);

    } catch (err) {
        console.error("Export error:", err);
        alert("Failed to export gzip.");
    }
}

/* ------------------------------------------------------------
   Dexie Table Helpers
   ------------------------------------------------------------ */
function smarhamrGetRows(dexieData, tableName) {
    if (!dexieData || !dexieData[tableName]) return [];
    return dexieData[tableName];
}

function smarhamrSetRows(dexieData, tableName, rows) {
    dexieData[tableName] = rows;
}
