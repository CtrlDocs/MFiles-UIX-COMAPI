CtrlDocs.AssociatedPropertyDef = class AssociatedPropertyDef {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    get PropertyDef() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.property_def;
        }
        else return this.#native.PropertyDef;
    }

    get Required() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.is_required;
        }
        else return this.#native.Required;
    }
    
    GetNative() {
        return this.#native;
    }
}