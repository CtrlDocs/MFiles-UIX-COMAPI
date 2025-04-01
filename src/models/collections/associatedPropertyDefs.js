CtrlDocs.AssociatedPropertyDefs = class AssociatedPropertyDefs extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.AssociatedPropertyDefs.ConvertFromNative(native)
        );
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.AssociatedPropertyDef(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.AssociatedPropertyDef(it));
        }
    }

    get Count() {
        return this.length;
    }
    
    // Methods

    /**
     * Adds a CtrlDocs.FolderDef to the collection
     * @param index {number}
     * @param value {CtrlDocs.AssociatedPropertyDef}
     */
    Add(index, value) {
        this.push(value);
    }
}