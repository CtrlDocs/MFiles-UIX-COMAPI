CtrlDocs.ShellFrame = class ShellFrame {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get CurrentPath() {
        return this.#native.CurrentPath;
    }
    set CurrentPath(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else this.#native.CurrentPath = value;
    }

    get RightPane() {
        return new CtrlDocs.ShellPaneContainer(this.#native.RightPane);
    }

    get ShellUI() {
        return this.#native.ShellUI;
    }

    get ActiveListing() {
        return new CtrlDocs.ShellListing(this.#native.ActiveListing);
    }
    
    // Methods

    /**
     * Navigates the UI to the given folder definitions
     * @param folderDefs {CtrlDocs.FolderDefs}
     */
    NavigateToFolder(folderDefs) {
        this.#native.NavigateToFolder(folderDefs.GetNative());
    }
    
    /**
     * Navigates the UI to the given objID
     * @param objID {CtrlDocs.ObjID}
     * @param newWindow {boolean}
     */
    NavigateToObject(objID, newWindow = true) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.NavigateToObject(objID.GetNative(), newWindow);
        } else if (CtrlDocs.Platform.Current === UixPlatform.LEGACY_CLIENT) {
            if (!newWindow) this.#native.NavigateToObject(objID.GetNative());
            else {
                const url = this.#native.ShellUI.Vault.ObjectOperations.GetMFilesURLForObject(objID.GetNative(), -1, false, 0);
                MFiles.ExecuteURL(url);
            }
        }
        else this.#native.NavigateToObject(objID.GetNative());
    }
    
    ShowMessage(message) {
        this.#native.ShowMessage(message);
    }
    
    ShowDefaultContent() {
        this.#native.ShowDefaultContent();
    }
    
    ShowPopupDashboard(dashboardId, customData, titleOrOptions) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.ShowPopupDashboard(dashboardId, customData, titleOrOptions);
            return;
        }
        this.#native.ShowPopupDashboard(dashboardId, false, customData);
    }
    
    GetNative() {
        return this.#native;
    }
}