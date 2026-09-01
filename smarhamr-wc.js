/* ============================================================
   SmarHamr WC Mode — World‑Centric Logic
   ============================================================ */

/* ------------------------------------------------------------
   Initialize WC Mode
   ------------------------------------------------------------ */
function smarhamrInitWC() {
    smarhamrInitUI("wc");
    smarhamrLoadClipboard();
    smarhamrInitClipboardEvents();
    smarhamrRenderWCTables();
}

/* ------------------------------------------------------------
   Render World Assets
   ------------------------------------------------------------ */
function smarhamrRenderWCTables() {
    const list = smarhamrGet("assetList");

    if (!window.dexieData) {
        list.innerHTML = "<p><em>No assets loaded.</em></p>";
        return;
    }

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    if (!rows.length) {
        list.innerHTML = "<p><em>No worlds found.</em></p>";
        return;
    }

    list.innerHTML = "";
    rows.forEach(row => {
        const btn = document.createElement("button");
        btn.textContent = row.name || `World #${row.id}`;
        btn.onclick = () => smarhamrSelectWCAsset(row);
        if (row.id === window.selectedAssetId) btn.classList.add("active");
        list.appendChild(btn);
    });
}

/* ------------------------------------------------------------
   Select World + Populate Panels
   ------------------------------------------------------------ */
function smarhamrSelectWCAsset(row) {
    window.selectedAssetId = row.id;
    smarhamrHighlightWCAsset();
    smarhamrPopulateWCIdentity(row);
    smarhamrPopulateWCBehavior(row);
    smarhamrPopulateWCPrompting(row);
    smarhamrPopulateWCVisual(row);
    smarhamrPopulateWCInitialMessages(row);
    smarhamrPopulateWCLore(row);
    smarhamrPopulateWCCustomCode(row);
}

/* ------------------------------------------------------------
   Highlight Selected World
   ------------------------------------------------------------ */
function smarhamrHighlightWCAsset() {
    const list = smarhamrGet("assetList");
    Array.from(list.querySelectorAll("button")).forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent.includes(`#${window.selectedAssetId}`)) {
            btn.classList.add("active");
        }
    });
}

/* ------------------------------------------------------------
   Identity Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCIdentity(row) {
    const el = smarhamrGet("identityView");
    const identity = {
        id: row.id,
        name: row.name,
        uuid: row.uuid,
        creationTime: row.creationTime,
        lastMessageTime: row.lastMessageTime,
        folderPath: row.folderPath
    };
    el.textContent = JSON.stringify(identity, null, 2);
}

/* ------------------------------------------------------------
   Behavior Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCBehavior(row) {
    smarhamrGet("roleInstruction").value = row.roleInstruction || "";
    smarhamrGet("generalWritingInstructions").value = row.generalWritingInstructions || "";
    smarhamrGet("reminderMessage").value = row.reminderMessage || "";
    smarhamrGet("messageWrapperStyle").value = row.messageWrapperStyle || "";
    smarhamrGet("fitMessagesInContextMethod").value = row.fitMessagesInContextMethod || "";
    smarhamrGet("autoGenerateMemories").value = row.autoGenerateMemories || "";
    smarhamrGet("temperature").value = row.temperature ?? "";
    smarhamrGet("maxTokensPerMessage").value = row.maxTokensPerMessage ?? "";
    smarhamrGet("textEmbeddingModelName").value = row.textEmbeddingModelName || "";
}

function smarhamrSaveWCBehavior() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    row.roleInstruction = smarhamrGet("roleInstruction").value;
    row.generalWritingInstructions = smarhamrGet("generalWritingInstructions").value;
    row.reminderMessage = smarhamrGet("reminderMessage").value;
    row.messageWrapperStyle = smarhamrGet("messageWrapperStyle").value;
    row.fitMessagesInContextMethod = smarhamrGet("fitMessagesInContextMethod").value;
    row.autoGenerateMemories = smarhamrGet("autoGenerateMemories").value;
    row.temperature = parseFloat(smarhamrGet("temperature").value) || row.temperature;
    row.maxTokensPerMessage = parseInt(smarhamrGet("maxTokensPerMessage").value) || row.maxTokensPerMessage;
    row.textEmbeddingModelName = smarhamrGet("textEmbeddingModelName").value;

    smarhamrSetRows(window.dexieData, "worlds", rows);
    alert("World behavior saved.");
}

/* ------------------------------------------------------------
   Prompting Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCPrompting(row) {
    smarhamrGet("imagePromptPrefix").value = row.imagePromptPrefix || "";
    smarhamrGet("imagePromptSuffix").value = row.imagePromptSuffix || "";
    smarhamrGet("imagePromptTriggers").value = row.imagePromptTriggers || "";
    smarhamrGet("messageInputPlaceholder").value = row.messageInputPlaceholder || "";
}

function smarhamrSaveWCPrompting() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    row.imagePromptPrefix = smarhamrGet("imagePromptPrefix").value;
    row.imagePromptSuffix = smarhamrGet("imagePromptSuffix").value;
    row.imagePromptTriggers = smarhamrGet("imagePromptTriggers").value;
    row.messageInputPlaceholder = smarhamrGet("messageInputPlaceholder").value;

    smarhamrSetRows(window.dexieData, "worlds", rows);
    alert("Prompting saved.");
}

/* ------------------------------------------------------------
   Visual Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCVisual(row) {
    smarhamrGet("avatar").value =
        row.avatar ? JSON.stringify(row.avatar, null, 2) : "";

    smarhamrGet("scene").value =
        row.scene ? JSON.stringify(row.scene, null, 2) : "";

    smarhamrGet("userCharacter").value =
        row.userCharacter ? JSON.stringify(row.userCharacter, null, 2) : "";

    smarhamrGet("systemCharacter").value =
        row.systemCharacter ? JSON.stringify(row.systemCharacter, null, 2) : "";
}

function smarhamrSaveWCVisual() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    try { row.avatar = JSON.parse(smarhamrGet("avatar").value || "null"); } catch {}
    try { row.scene = JSON.parse(smarhamrGet("scene").value || "null"); } catch {}
    try { row.userCharacter = JSON.parse(smarhamrGet("userCharacter").value || "null"); } catch {}
    try { row.systemCharacter = JSON.parse(smarhamrGet("systemCharacter").value || "null"); } catch {}

    smarhamrSetRows(window.dexieData, "worlds", rows);
    alert("Visual identity saved.");
}

/* ------------------------------------------------------------
   Initial Messages Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCInitialMessages(row) {
    smarhamrGet("initialMessages").value =
        row.initialMessages ? JSON.stringify(row.initialMessages, null, 2) : "";
}

function smarhamrSaveWCInitialMessages() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    try {
        row.initialMessages = JSON.parse(smarhamrGet("initialMessages").value || "[]");
        smarhamrSetRows(window.dexieData, "worlds", rows);
        alert("Initial messages saved.");
    } catch {
        alert("Invalid JSON for initial messages.");
    }
}

/* ------------------------------------------------------------
   Lore Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCLore(row) {
    smarhamrGet("loreBookUrls").value =
        row.loreBookUrls ? JSON.stringify(row.loreBookUrls, null, 2) : "";
}

function smarhamrSaveWCLore() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    try {
        row.loreBookUrls = JSON.parse(smarhamrGet("loreBookUrls").value || "[]");
        smarhamrSetRows(window.dexieData, "worlds", rows);
        alert("Lore saved.");
    } catch {
        alert("Invalid JSON for loreBookUrls.");
    }
}

/* ------------------------------------------------------------
   Custom Code Panel
   ------------------------------------------------------------ */
function smarhamrPopulateWCCustomCode(row) {
    smarhamrGet("customCode").value = row.customCode || "";
}

function smarhamrSaveWCCustomCode() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "worlds");
    const row = rows.find(r => r.id === window.selectedAssetId);

    row.customCode = smarhamrGet("customCode").value;
    smarhamrSetRows(window.dexieData, "worlds", rows);
    alert("Custom code saved.");
}
