CtrlDocs.ObjOrFileVer = class ObjOrFileVer {
    #native;

    constructor(native) {
        this.#native = !native ? ObjOrFileVer.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                file_ver: undefined,
                obj_ver: undefined,
                isFile: false
            }
        } else return new MFiles.ObjOrFileVer();
    }
    
    IsFile() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.isFile;
        } else this.#native.IsFile();
    }
    
    // ID
    get ObjVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjVer(this.#native.obj_ver);
        }
        else return new CtrlDocs.ObjVer(this.#native.ObjVer);
    }
    set ObjVer(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.obj_ver = value.GetNative();
            this.#native.isFile = false;
            this.#native.file_ver = undefined;
        }
        else this.#native.ObjVer = value.GetNative();
    }

    // Type
    get FileVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.FileVer(this.#native.file_ver);
        }
        else return new CtrlDocs.FileVer(this.#native.FileVer);
    }
    
    set FileVer(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.file_ver = value.GetNative();
            this.#native.isFile = true;
            this.#native.obj_ver = undefined;
        }
        else this.#native.FileVer = value.GetNative();
    }
    
    GetNative() {
        return this.#native;
    }
}