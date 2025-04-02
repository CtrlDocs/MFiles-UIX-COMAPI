CtrlDocs.ViewOperations = class ViewOperations {
    #vault;
    #native;
    #nativeAsync;

    /**
     * @param vault {CtrlDocs.Vault}
     */
    constructor(vault) {
        this.#vault = vault;
        this.#native = vault.GetNative().ViewOperations;
        this.#nativeAsync = vault.GetNative().Async?.ViewOperations;
    }

    /**
     * @param viewId {number}
     * @param includeViewNameInPath {boolean}
     * @returns {string}
     */
    GetViewLocationInClient(viewId, includeViewNameInPath = true) {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO However this is not currently in use anywhere but the legacy client, so fine for now
        }
        else {
            return this.#native.GetViewLocationInClient(viewId, includeViewNameInPath);
        }
    }
    
    GetNative() {
        return this.#native;
    }
}