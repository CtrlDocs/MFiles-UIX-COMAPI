CtrlDocs.PropertyDef = class PropertyDef {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get ValueList() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.value_list;
        }
        else return this.#native.ValueList;
    }

    get ContentType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.content_type;
        }
        else return this.#native.ContentType;
    }

    get DataType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data_type;
        }
        else return this.#native.DataType;
    }

    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.id;
        }
        else return this.#native.ID;
    }

    get UpdateType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.update_type;
        }
        else return this.#native.UpdateType;
    }

    get AutomaticValueType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.automative_value_type;
        }
        else return this.#native.AutomaticValueType;
    }

    get Name() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.name;
        }
        else return this.#native.Name;
    }

    get Permissions() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                CanEdit: this.#native.property_def_permissions.current_user_can_edit,
                CanRead: this.#native.property_def_permissions.current_user_can_see
            }
        }
        else return this.#native.Permissions;
    }

    get OwnerPropertyDef() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.OwnerPropertyDef(this.#native.owner_property_def_info);
        }
        else return new CtrlDocs.OwnerPropertyDef(this.#native.OwnerPropertyDef);
    }

    get DependencyPD() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.owner_property_def_info.property_def;
        }
        else return this.#native.DependencyPD;
    }

    get DependencyRelation() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.owner_property_def_info.dependency_relation;
        }
        else return this.#native.DependencyRelation;
    }
    
    GetNative() {
        return this.#native;
    }
}