CtrlDocs.OwnerPropertyDef = class OwnerPropertyDef {
    #native;
    constructor(native) {
        this.#native = native;
    }
    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.property_def;
        }
        else return this.#native.ID;
    }
    GetNative() {
        return this.#native;
    }
}