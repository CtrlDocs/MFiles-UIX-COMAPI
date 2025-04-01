CtrlDocs.ObjectClass = class ObjectClass {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.base_info.item_info.obj_id.item_id.internal_id;
        }
        else return this.#native.ID;
    }

    get Name() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.base_info.item_info.name;
        }
        else return this.#native.Name;
    }
    
    get AssociatedPropertyDefs() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.AssociatedPropertyDefs(this.#native.associated_property_defs);
        }
        else return new CtrlDocs.AssociatedPropertyDefs(this.#native.AssociatedPropertyDefs);
    }
    
    GetNative() {
        return this.#native;
    }
}