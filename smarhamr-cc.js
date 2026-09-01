/* ============================================================
   SmarHamr CC Mode — Character‑Centric Logic
   ============================================================ */

/* ------------------------------------------------------------
   Initialize CC Mode
   ------------------------------------------------------------ */
function smarhamrInitCC() {
    smarhamrInitUI("cc");
    smarhamrLoadClipboard();
    smarhamrInitClipboardEvents();
    smarhamrRenderCCAssets();
}

/* ------------------------------------------------------------
   Render Character Assets
   ------------------------------------------------------------ */
function smarhamrRenderCCAssets() {
    const list = smarhamrGet("assetList");

    if (!window.dexieData) {
        list.innerHTML = "<p><em>No assets loaded.</em></p>";
        return;
    }

    const rows = smarhamrGetRows(window.dexieData, "characters");
    if (!rows.length) {
        list.innerHTML = "<p><em>No assets found.</em></p>";
        return;
    }

    list.innerHTML = "";
    rows.forEach(row => {
        const btn = document.createElement("button");
        btn.textContent = row.name || `Asset #${row.id}`;
        btn.onclick = () => smarhamrSelectCCAsset(row);
        if (row.id === window.selectedAssetId) btn.classList.add("active");
        list.appendChild(btn);
    });
}

/* ------------------------------------------------------------
   Select Asset + Populate Panels
   ------------------------------------------------------------ */
function smarhamrSelectCCAsset(row) {
    window.selectedAssetId = row.id;
    smarhamrHighlightCCAsset();
    smarhamrPopulateIdentity(row);
    smarhamrPopulateBehavior(row);
    smarhamrPopulatePrompting(row);
    smarhamrPopulateVisual(row);
    smarhamrPopulateInitialMessages(row);
    smarhamrPopulateLore(row);
    smarhamrPopulateCustomCode(row);
}

/* ------------------------------------------------------------
   Highlight Selected Asset
   ------------------------------------------------------------ */
function smarhamrHighlightCCAsset() {
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
function smarhamrPopulateIdentity(row) {
    const el = smarhamrGet("identityView");
    const identity = {
        id: row.id,
        name: row.name,
        modelName: row.modelName,
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
function smarhamrPopulateBehavior(row) {
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

function smarhamrSaveBehavior() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
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

    smarhamrSetRows(window.dexieData, "characters", rows);
    alert("World behavior saved.");
}

/* ------------------------------------------------------------
   Prompting Panel
   ------------------------------------------------------------ */
function smarhamrPopulatePrompting(row) {
    smarhamrGet("imagePromptPrefix").value = row.imagePromptPrefix || "";
    smarhamrGet("imagePromptSuffix").value = row.imagePromptSuffix || "";
    smarhamrGet("imagePromptTriggers").value = row.imagePromptTriggers || "";
    smarhamrGet("messageInputPlaceholder").value = row.messageInputPlaceholder || "";
}

function smarhamrSavePrompting() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
    const row = rows.find(r => r.id === window.selectedAssetId);

    row.imagePromptPrefix = smarhamrGet("imagePromptPrefix").value;
    row.imagePromptSuffix = smarhamrGet("imagePromptSuffix").value;
    row.imagePromptTriggers = smarhamrGet("imagePromptTriggers").value;
    row.messageInputPlaceholder = smarhamrGet("messageInputPlaceholder").value;

    smarhamrSetRows(window.dexieData, "characters", rows);
    alert("Prompting saved.");
}

/* ------------------------------------------------------------
   Visual Panel
   ------------------------------------------------------------ */
function smarhamrPopulateVisual(row) {
    smarhamrGet("avatar").value =
        row.avatar ? JSON.stringify(row.avatar, null, 2) : "";

    smarhamrGet("scene").value =
        row.scene ? JSON.stringify(row.scene, null, 2) : "";

    smarhamrGet("userCharacter").value =
        row.userCharacter ? JSON.stringify(row.userCharacter, null, 2) : "";

    smarhamrGet("systemCharacter").value =
        row.systemCharacter ? JSON.stringify(row.systemCharacter, null, 2) : "";
}

function smarhamrSaveVisual() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
    const row = rows.find(r => r.id === window.selectedlectedAssetId);

    try { row.avatar = JSON.parse(smarhamrGet("avatar").value || "null"); } catch {}
    try { row.scene = JSON.parse(smarhamrGet("scene").value || "null"); } catch {}
    try { row.userCharacter = JSON.parse(smarhamrGet("userCharacter").value || "null"); } catch {}
    try { row.systemCharacter = JSON.parse(smarhamrGet("systemCharacter").value || "null"); } catch {}

    smarhamrSetRows(window.dexieData, "characters", rows);
    alert("Visual identity saved.");
}

/* ------------------------------------------------------------
   Initial Messages Panel
   ------------------------------------------------------------ */
function smarhamrPopulateInitialMessages(row) {
    smarhamrGet("initialMessages").value =
        row.initialMessages ? JSON.stringify(row.initialMessages, null, 2) : "";
}

function smarhamrSaveInitialMessages() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
    const row = rows.find(r => r.id === window.selectedAssetId);

    try {
        row.initialMessages = JSON.parse(smarhamrGet("initialMessages").value || "[]");
        smarhamrSetRows(window.dexieData, "characters", rows);
        alert("Initial messages saved.");
    } catch {
        alert("Invalid JSON for initial messages.");
    }
}

/* ------------------------------------------------------------
   Lore Panel
   ------------------------------------------------------------ */
function smarhamrPopulateLore(row) {
    smarhamrGet("loreBookUrls").value =
        row.loreBookUrls ? JSON.stringify(row.loreBookUrls, null, 2) : "";
}

function smarhamrSaveLore() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
    const row = rows.find(r => r.id === window.selectedAssetId);

    try {
        row.loreBookUrls = JSON.parse(smarhamrGet("loreBookUrls").value || "[]");
        smarhamrSetRows(window.dexieData, "characters", rows);
        alert("Lore saved.");
    } catch {
        alert("Invalid JSON for loreBookUrls.");
    }
}

/* ------------------------------------------------------------
   Custom Code Panel
   ------------------------------------------------------------ */
function smarhamrPopulateCustomCode(row) {
    smarhamrGet("customCode").value = row.customCode || "";
}

function smarhamrSaveCustomCode() {
    if (!window.dexieData || window.selectedAssetId == null) return;

    const rows = smarhamrGetRows(window.dexieData, "characters");
    const row = rows.find(r => r.id === window.selectedAssetId);

    row.customCode = smarhamrGet("customCode").value;
    smarhamrSetRows(window.dexieData, "characters", rows);
    alert("Custom code saved.");
}

/* ------------------------------------------------------------
   Thread Builder (scratchpad only)
   ------------------------------------------------------------ */
function smarhamrPopulateThreadBuilder() {
    smarhamrGet("threadLore").value = "";
    smarhamrGet("threadMemory").value = "";
    smarhamrGet("threadMessages").value = "";
}
