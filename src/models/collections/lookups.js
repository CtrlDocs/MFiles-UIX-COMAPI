CtrlDocs.Lookups = class Lookups extends Array {
    constructor(native) {
        super(
            ...CtrlDocs.Lookups.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                values: []
            }
        } else return new MFiles.Lookups();
    }
    
    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.values.map(it => new CtrlDocs.Lookup(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.Lookup(it));
        }
    }

    get Count() {
        return this.length;
    }
    
    // Methods
    
    /**
     * Adds a CtrlDocs.Lookup to the collection
     * @param index {number}
     * @param value {CtrlDocs.Lookup}
     */
    Add(index, value) {
        this.push(value); // TODO splice if index != -1
    }
    
    CompareTo(that) {
        if (this.length !== that.length){
            return -1;
        }

        // Sort the values in each collection by ID and version
        const sortedThis = [...this].sort((a, b) => a.CompareTo(b));
        const sortedThat = [...that].sort((a, b) => a.CompareTo(b));

        for (let i = 0; i < sortedThis.length; i++) {
            const lookup1 = sortedThis[i];
            const lookup2 = sortedThat[i];

            if (lookup1.CompareTo(lookup2) === 0) {
                console.log(`Match found: ID: ${lookup1.ID}, Version: ${lookup1.Version}`);
            } else {
                console.log(`No match: Lookup1(ID: ${lookup1.ID}, Version: ${lookup1.Version}) vs Lookup2(ID: ${lookup2.ID}, Version: ${lookup2.Version})`);
                return -1;
            }
        }

        // The collections are equal
        return 0;
    }
    
    toJSON() {
        return [...this.map(item => item.toJSON())];
    }
    
    GetNative() {
        const nativeObject = CtrlDocs.Lookups.CreateNative();
        if (CtrlDocs.Platform.IsNextGen()) {
            this.forEach(it => {
                nativeObject.values.push(it.GetNative());
            });
        } else {
            this.forEach(it => {
                nativeObject.Add(-1, it.GetNative());
            });
        }
        return nativeObject;
    }
}