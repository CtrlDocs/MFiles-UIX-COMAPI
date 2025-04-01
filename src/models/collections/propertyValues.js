CtrlDocs.PropertyValues = class PropertyValues extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.PropertyValues.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return []
        } else return new MFiles.PropertyValues();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.PropertyValue(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.PropertyValue(it));
        }
    }

    get Count() {
        return this.length;
    }

    // Methods

    /**
     * Adds a CtrlDocs.PropertyValue to the collection
     * @param index {number}
     * @param value {CtrlDocs.PropertyValue}
     */
    Add(index, value) {
        this.push(value);
    }

    IndexOf(id) {
        return this.findIndex(it => it.PropertyDef === id);
    }

    Item(id) {
        return this[id];
    }
    
    toJSON() {
        return this.map(it => it.toJSON());
    }

    GetNative() {
        const nativeObject = CtrlDocs.PropertyValues.CreateNative();
        if (CtrlDocs.Platform.IsNextGen()) {
            this.forEach(it => {
                nativeObject.push(it.GetNative());
            });
        } else {
            this.forEach(it => {
                nativeObject.Add(-1, it.GetNative());
            });
        }
        return nativeObject;
    }
}