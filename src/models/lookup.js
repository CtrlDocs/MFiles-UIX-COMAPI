CtrlDocs.Lookup = class Lookup {
    #native;
    
    constructor(native) {
        this.#native = !native ? Lookup.CreateNative() : native;
    }
    
    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                value_list_item_info: {
                    obj_id: new CtrlDocs.ObjID().GetNative(),
                    options: {
                        is_deleted: false
                    }
                },
                version: {
                    internal_version: -1,
                    type: 1
                }
            }
        } else return new MFiles.Lookup();
    }
    
    get Item() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.value_list_item_info.obj_id.item_id.internal_id;
        }
        else return this.#native.Item;
    }
    set Item(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value_list_item_info.obj_id.item_id.internal_id = value
        } 
        else this.#native.Item = value;
    }

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

    get ObjectType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.value_list_item_info.obj_id.type;
        }
        else return this.#native.ObjectType;
    }
    set ObjectType(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value_list_item_info.obj_id.type = value;
        }
        else this.#native.ObjectType = value;
    }

    get Deleted() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.value_list_item_info.options.is_deleted;
        }
        else return this.#native.Deleted;
    }
    set Deleted(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value_list_item_info.options.is_deleted = value;
        }
        else this.#native.Deleted = value;
    }

    get Hidden() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return this.#native.Hidden;
    }
    set Hidden(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else this.#native.Hidden = value;
    }

    get DisplayValue() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.value_list_item_info.name;
        }
        else return this.#native.DisplayValue;
    }
    set DisplayValue(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value_list_item_info.name = value;
        }
        else this.#native.DisplayValue = value;
    }

    /**
     * 
     * @param that {CtrlDocs.Lookup}
     * @constructor
     */
    CompareTo(that) {
        if (this.Item !== that.Item) {
            return this.Item - that.Item;
        }
        return this.Version - that.Version;
    }
    
    GetNative() {
        return this.#native;
    }
    
    toJSON() {
        return {
            Item: this.Item,
            Version: this.Version,
            DisplayValue: this.DisplayValue,
            Hidden: this.Hidden,
            Deleted: this.Deleted,
            ObjectType: this.ObjectType
        }
    }
}