CtrlDocs.SearchConditions = class SearchConditions extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.SearchConditions.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return []
        } else return new MFiles.SearchConditions();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.SearchCondition(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.SearchCondition(it));
        }
    }

    get Count() {
        return this.length;
    }

    // Methods

    /**
     * Adds a CtrlDocs.SearchCondition to the collection
     * @param index {number}
     * @param value {CtrlDocs.SearchCondition}
     */
    Add(index, value) {
        this.push(value);
    }

    Item(id) {
        return this[id];
    }
    
    toJSON() {
        return this.map(it => it.toJSON());
    }

    GetNative() {
        const nativeObject = CtrlDocs.SearchConditions.CreateNative();
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