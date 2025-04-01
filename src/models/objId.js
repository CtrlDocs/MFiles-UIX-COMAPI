CtrlDocs.ObjID = class ObjID {
    #native;

    constructor(native) {
        this.#native = !native ? ObjID.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                "type": 0,
                "item_id": {
                    "internal_id": 0,
                    "external_repository_id": {
                        "connection": "",
                        "item": ""
                    }
                }
            }
        } else return new MFiles.ObjID();
    }
    
    // ID
    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.item_id.internal_id;
        }
        else return this.#native.ID;
    }
    set ID(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.item_id.internal_id = value
        }
        else this.#native.ID = value;
    }

    // Type
    get Type() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.type;
        }
        else return this.#native.Type;
    }
    set Type(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.type = value;
        }
        else this.#native.Type = value;
    }
    
    toJSON() {
        return {
            ID: this.ID,
            Type: this.Type
        }
    }
    
    // Methods
    SetIDs(objectType, id) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.Type = objectType;
            this.ID = id;
        }
        else this.#native.SetIDs(objectType, id);
    }
    
    GetNative() {
        return this.#native;
    }
}