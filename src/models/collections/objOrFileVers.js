CtrlDocs.ObjOrFileVers = class ObjOrFileVers extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.ObjOrFileVers.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return []
        } else return new MFiles.ObjOrFileVers();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return [];
        } else {
            return Array.from(native).map(it => new CtrlDocs.ObjOrFileVers(it));
        }
    }

    get Count() {
        return this.length;
    }
    
    // Methods

    /**
     * Adds a CtrlDocs.ObjOrFileVer to the collection
     * @param index {number}
     * @param value {CtrlDocs.ObjOrFileVer}
     */
    Add(index, value) {
        this.push(value);
    }

    GetNative() {
        const nativeObject = CtrlDocs.ObjOrFileVers.CreateNative();
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