CtrlDocs.PropertyValue = class PropertyValue {
    #native;

    constructor(native) {
        this.#native = !native ? PropertyValue.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                property_def: -1,
                value: {}
            }
        } else return new MFiles.PropertyValue();
    }

    /**
     * @return {number}
     */
    get PropertyDef() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.property_def;
        }
        else return this.#native.PropertyDef;
    }

    /**
     * @param value {number}
     */
    set PropertyDef(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.property_def = value;
        }
        else this.#native.PropertyDef = value;
    }

    /**
     * @return {CtrlDocs.TypedValue}
     */
    get Value() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.TypedValue(this.#native.value);
        }
        else return new CtrlDocs.TypedValue(this.#native.Value);
    }

    /**
     * @param value {CtrlDocs.TypedValue}
     */
    set Value(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value = value.GetNative();
        }
        else this.#native.Value = value.GetNative();
    }

    /**
     * @return {CtrlDocs.TypedValue}
     */
    get TypedValue() {
        return this.Value;
    }

    /**
     * @param value {CtrlDocs.TypedValue}
     */
    set TypedValue(value) {
        this.Value = value;
    }
    
    // Methods
    /**
     * @return {string}
     */
    GetValueAsLocalizedText() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.GetValueAsUnlocalizedText();
        }
        else return this.#native.GetValueAsLocalizedText();
    }

    /**
     * @return {string}
     */
    GetValueAsUnlocalizedText() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.TypedValueHelper.GetValueAsUnlocalizedText(this.#native.value);
        }
        else return this.#native.GetValueAsUnlocalizedText();
    }
    
    toJSON() {
        return {
            Value: this.Value.toJSON(),
            PropertyDef: this.PropertyDef
        }
    }
    
    GetNative() {
        return this.#native;
    }
}