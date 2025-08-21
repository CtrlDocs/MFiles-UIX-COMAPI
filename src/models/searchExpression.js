CtrlDocs.Expression = class Expression {
    #native;
    
    constructor(native) {
        this.#native = !native ? Expression.CreateNative() : native;
    }
    
    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                "type": 0,
                "data": {},
                "indirection_levels": []
            }
        } else return new MFiles.Expression();
    }

    // property value data
    get DataPropertyValueDataFunction() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.property_value?.data_function?.data_function;
        }
        else return this.#native.DataPropertyValueDataFunction;
    }

    set DataPropertyValueDataFunction(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            CtrlDocs.JsUtils.EnsurePath(this.#native, ["data", "property_value", "data_function"]);
            this.#native.data.property_value.data_function.data_function = value;
        }
        else this.#native.DataPropertyValueDataFunction = value;
    }

    get DataPropertyValueParentChildBehavior() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.property_value?.parent_child_behavior;
        }
        else return this.#native.DataPropertyValueParentChildBehavior;
    }
    set DataPropertyValueParentChildBehavior(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            CtrlDocs.JsUtils.EnsurePath(this.#native, ["data", "property_value"]);
            this.#native.data.property_value.parent_child_behavior = value;
        }
        else this.#native.DataPropertyValueParentChildBehavior = value;
    }

    get DataPropertyValuePropertyDef() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.property_value?.property_def;
        }
        else return this.#native.DataPropertyValuePropertyDef;
    }
    set DataPropertyValuePropertyDef(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            CtrlDocs.JsUtils.EnsurePath(this.#native, ["data", "property_value"]);
            this.#native.data.property_value.property_def = value;
        }
        else this.#native.DataPropertyValuePropertyDef = value;
    }

    // status value data
    get DataStatusValueType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.status_value?.type;
        }
        else return this.#native.DataStatusValueType;
    }
    set DataStatusValueType(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            CtrlDocs.JsUtils.EnsurePath(this.#native, ["data", "status_value"]);
            this.#native.data.status_value.type = value;
        }
        else this.#native.DataStatusValueType = value;
    }

    get DataStatusValueDataFunction() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.status_value?.data_function?.data_function;
        }
        else return this.#native.DataStatusValueDataFunction;
    }
    set DataStatusValueDataFunction(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            CtrlDocs.JsUtils.EnsurePath(this.#native, ["data", "status_value", "data_function"]);
            this.#native.data.status_value.data_function.data_function = value;
        }
        else this.#native.DataStatusValueDataFunction = value;
    }

    
    GetNative() {
        return this.#native;
    }
}