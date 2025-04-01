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

    constructor(native, shellFrame) {
        this.#native = native;
        this.ShellFrame = shellFrame;
        this.ObjectOperations = new CtrlDocs.ObjectOperations(
            this.#native.ObjectOperations, this.#native.Async?.ObjectOperations, this);
        this.ObjectFileOperations = new CtrlDocs.ObjectFileOperations(
            this.#native.ObjectFileOperations, this.#native.Async?.ObjectFileOperations, this);
        this.ObjectPropertyOperations = new CtrlDocs.ObjectPropertyOperations(
            this.#native.ObjectPropertyOperations, this.#native.Async?.ObjectPropertyOperations, this);
        
        if (CtrlDocs.Platform.IsNextGen()) {
            this.ExtensionMethodOperations = new CtrlDocs.ExtensionMethodOperations(this.#native.VaultExtensionMethodsOperations);
            this.SessionInfo = new CtrlDocs.SessionInfo(
                window.parent.MFiles._appData.mFilesCommon.getSessionInfo(),
                null,
                this
            )
        } else {
            this.SessionInfo = new CtrlDocs.SessionInfo(
                this.#native.SessionInfo, this.#native.Async?.SessionInfo, this);
            this.ExtensionMethodOperations = new CtrlDocs.ExtensionMethodOperations(
                this.#native.ExtensionMethodOperations, this.#native.Async?.ExtensionMethodOperations);
            this.ViewOperations = new CtrlDocs.ViewOperations(
                this.#native.ViewOperations, this.#native.Async?.ViewOperations); // TODO  does not exist
        }
    }
    
    get CurrentLoggedInUserID() {
        return this.SessionInfo.UserID;
    }
    
    GetNative() {
        return this.#native;
    }
}