CtrlDocs.ObjectFile = class ObjectFile {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    /**
     * Adds a CtrlDocs.ObjVer to the collection
     * @returns {CtrlDocs.FileVer}
     */
    get FileVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.FileVer(this.#native.file_ver);
        }
        else return new CtrlDocs.FileVer(this.#native.FileVer);
    }
    
    get Title() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.title;
        }
        else return this.#native.Title;
    }

    get Extension() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.extension;
        }
        else return this.#native.Extension;
    }

    get EscapedName() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return `${this.Title}.${this.Extension}`;
        }
        else return !!this.#native.EscapedName 
            ? this.#native.EscapedName
            : `${this.Title}.${this.Extension}`;
    }
    
    GetNative() {
        return this.#native;
    }
}