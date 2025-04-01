CtrlDocs.ShellPaneTab = class ShellPaneTab {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    // Methods
    Select() {
        this.#native.Select();
    }
    
    GetNative() {
        return this.#native;
    }
}