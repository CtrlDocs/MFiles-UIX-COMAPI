CtrlDocs.ObjVers = class ObjVers extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.ObjVers.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return [];
        } else return new MFiles.ObjVers();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.ObjVer(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.ObjVer(it));
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
        const nativeObject = CtrlDocs.ObjVers.CreateNative();
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