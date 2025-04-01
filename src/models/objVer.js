CtrlDocs.ObjVer = class ObjVer {
    #native;
    
    constructor(native) {
        this.#native = !native ? ObjVer.CreateNative() : native;
    }
    
    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                "obj_id": {
                    "type": undefined,
                    "item_id": {
                        "internal_id": undefined
                    }
                },
                "version": {
                    "type": 1,
                    "internal_version": -1
                }
            }
        } else return new MFiles.ObjVer();
    }
    
    // ID
    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.obj_id.item_id.internal_id;
        }
        else return this.#native.ID;
    }
    set ID(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.obj_id.item_id.internal_id = value;
        } 
        else this.#native.ID = value;
    }

    // Version
    get Version() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.version.internal_version;
        }
        else return this.#native.Version;
    }
    set Version(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.version.internal_version = value;
            if (value === -1) this.#native.version.type = 1;
            else this.#native.version.type = 4;
        }
        else this.#native.Version = value;
    }

    // Type
    get Type() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.obj_id.type;
        }
        else return this.#native.Type;
    }
    set Type(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.obj_id.type = value;
        }
        else this.#native.Type = value;
    }


    /**
     * Gets the ObjID of the current ObjVer
     * @return {CtrlDocs.ObjID}
     */
    get ObjID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjID(this.#native.obj_id);
        } else if (CtrlDocs.Platform.Current === UixPlatform.LEGACY_WEB) {
            return new CtrlDocs.ObjID({
                ID: this.ID,
                Type: this.Type
            });
        }
        else return new CtrlDocs.ObjID(this.#native.ObjID);
    }
    
    toJSON() {
        return {
            ID: this.ID,
            Version: this.Version,
            Type: this.Type,
            ObjID: this.ObjID.toJSON()
        }
    }
    
    // Methods
    SetIDs(objectType, id, version) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.Type = objectType;
            this.ID = id;
            this.Version = version;
        }
        else this.#native.SetIDs(objectType, id, version);
    }

    CompareTo(other) {
        // Check if the other object is an instance of Reference
        if (!other) return 1;

        // Compare IDs
        if (this.ID < other.ID) {
            return -1; // this is less than other
        } else if (this.ID > other.ID) {
            return 1; // this is greater than other
        }

        // If IDs are equal, compare Versions
        if (this.Version < other.Version) {
            return -1; // this is less than other
        } else if (this.Version > other.Version) {
            return 1; // this is greater than other
        }

        // If both ID and Version are equal
        return 0; // this is equal to other
    }
    
    GetNative() {
        return this.#native;
    }
}