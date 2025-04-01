CtrlDocs.ACL = class ACL {
    #native;

    constructor(native) {
        this.#native = !native ? ACL.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {}
        } else return new MFiles.AccessControlList();
    }
    
    GetNative() {
        return this.#native;
    }
}