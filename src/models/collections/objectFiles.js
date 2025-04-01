CtrlDocs.ObjectFiles = class ObjectFiles extends Array {

    constructor(native) {
        super(
            ...CtrlDocs.ObjectFiles.ConvertFromNative(native)
        );
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return [];
        } else return new MFiles.ObjectFiles();
    }

    static ConvertFromNative(native) {
        if (!native) return [];
        if (isNumber(native)) return [native];
        if (CtrlDocs.Platform.IsNextGen()) {
            return native.map(it => new CtrlDocs.ObjectFile(it));
        } else {
            return Array.from(native).map(it => new CtrlDocs.ObjectFile(it));
        }
    }

    get Count() {
        return this.length;
    }

    GetNative() {
        const nativeObject = CtrlDocs.ObjectFiles.CreateNative();
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