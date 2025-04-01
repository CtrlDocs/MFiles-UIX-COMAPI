CtrlDocs.ShellPaneContainer = class ShellPaneContainer {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    // Methods

    /**
     * Gets the tab of a given name
     * @param {string} name - The name of the tab to get
     * @return {Promise<CtrlDocs.ShellPaneTab>}
     */
    GetTab(name) {
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                resolve(this.#native.GetTab(name));
            }
            else {
                let tab = this.#native.GetTab(name);
                resolve(new CtrlDocs.ShellPaneTab(tab));
            }
        });
    }
    
    GetNative() {
        return this.#native;
    }
}