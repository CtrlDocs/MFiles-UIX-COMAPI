CtrlDocs.ObjectSearchResults = class ObjectSearchResults extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.ObjectSearchResults.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return [];
        } else return new MFiles.ObjectVersions();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (CtrlDocs.JsUtils.isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.ObjectVersion(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.ObjectVersion(it));
        }
    }

    get Count() {
        return this.length;
    }
    
    // Methods

    /**
     * Adds a CtrlDocs.ObjVer to the collection
     * @param index {number}
     * @param value {CtrlDocs.ObjVer}
     */
    Add(index, value) {
        this.push(value);
    }

    GetNative() {
        const nativeObject = CtrlDocs.ObjectSearchResults.CreateNative();
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