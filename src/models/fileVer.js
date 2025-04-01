CtrlDocs.FileVer = class FileVer {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    // ID
    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.file_id.internal_id;
        }
        else return this.#native.ID;
    }

    get Version() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.internal_version;
        }
        else return this.#native.Version;
    }
    
    toJSON() {
        return {
            ID: this.ID,
            Version: this.Version
        }
    }
    
    GetNative() {
        return this.#native;
    }
}