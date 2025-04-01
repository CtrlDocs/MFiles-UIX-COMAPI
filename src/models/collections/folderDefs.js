CtrlDocs.FolderDefs = class FolderDefs extends Array {

    constructor(native) {
        super(
            ...CtrlDocs.FolderDefs.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                folders: []
            }
        } else return new MFiles.FolderDefs();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.folders.map(it => new CtrlDocs.FolderDef(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.FolderDef(it));
        }
    }

    get Count() {
        return this.length;
    }
    
    // Methods

    /**
     * Adds a CtrlDocs.FolderDef to the collection
     * @param index {number}
     * @param value {CtrlDocs.FolderDef}
     */
    Add(index, value) {
        this.push(value);
    }

    GetNative() {
        const nativeObject = CtrlDocs.FolderDefs.CreateNative();
        if (CtrlDocs.Platform.IsNextGen()) {
            this.forEach(it => {
                nativeObject.folders.push(it.GetNative());
            });
        } else {
            this.forEach(it => {
                nativeObject.Add(-1, it.GetNative());
            });
        }
        return nativeObject;
    }
}