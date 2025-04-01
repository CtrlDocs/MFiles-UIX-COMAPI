CtrlDocs.ViewOperations = class ViewOperations {
    #native;
    #nativeAsync;

    constructor(native, nativeAsync) {
        this.#native = native;
        this.#nativeAsync = nativeAsync;
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