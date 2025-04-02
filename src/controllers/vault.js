CtrlDocs.Vault = class Vault {
    #native;
    /** @type {CtrlDocs.SessionInfo} */
    SessionInfo;
    /** @type {CtrlDocs.ObjectOperations} */
    ObjectOperations;
    /** @type {CtrlDocs.ObjectFileOperations} */
    ObjectFileOperations;
    /** @type {CtrlDocs.ObjectPropertyOperations} */
    ObjectPropertyOperations;
    /** @type {CtrlDocs.ExtensionMethodOperations} */
    ExtensionMethodOperations;
    /** @type {CtrlDocs.ViewOperations} */
    ViewOperations;
    /** @type {CtrlDocs.ShellFrame} */
    ShellFrame;

    /**
     * @param vault {MFiles.Vault}
     * @param sessionInfo {MFiles.SessionInfo}
     * @param shellFrame {CtrlDocs.ShellFrame}
     */
    constructor(vault, sessionInfo, shellFrame) {
        this.#native = vault;
        this.ShellFrame = shellFrame;
        this.ObjectOperations = new CtrlDocs.ObjectOperations(this);
        this.ObjectFileOperations = new CtrlDocs.ObjectFileOperations(this);
        this.ObjectPropertyOperations = new CtrlDocs.ObjectPropertyOperations(this);
        this.ExtensionMethodOperations = new CtrlDocs.ExtensionMethodOperations(this);
        this.ViewOperations = new CtrlDocs.ViewOperations(this);
        this.SessionInfo = new CtrlDocs.SessionInfo(sessionInfo, this);
    }

    /**
     * Helper function to get a CtrlDocs.Vault from a ShellFrame as a promise.
     * The challenge being that the sessioninfo in vnext in async.
     * @param shellFrame {CtrlDocs.ShellFrame}
     * @returns {Promise<CtrlDocs.Vault>}
     */
    static FromShellFrame(shellFrame) {
        return new Promise((resolve, reject) => {
            const vault = shellFrame.ShellUI.Vault;

            if (CtrlDocs.Platform.IsNextGen()) {
                MFiles.GetSessionInfo().then(sessionInfo => {
                    MFiles.GetVaultInfo().then(vaultInfo => {
                        sessionInfo.vault_data.vault_attachment = vaultInfo.GUID;
                        resolve(new CtrlDocs.Vault(vault, sessionInfo, shellFrame));
                    });
                });
                return;
            }

            const sessionInfo = CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_CLIENT 
                ? vault.SessionInfo 
                : vault.Async.SessionInfo;

            resolve(new CtrlDocs.Vault(vault, sessionInfo, shellFrame));
        });
    }
    
    get CurrentLoggedInUserID() {
        return this.SessionInfo.UserID;
    }
    
    GetNative() {
        return this.#native;
    }
}