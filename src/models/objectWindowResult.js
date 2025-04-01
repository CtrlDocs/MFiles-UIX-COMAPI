CtrlDocs.ObjectWindowResult = class ObjectWindowResult {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get Result() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.result_code;
        }
        else return this.#native.Result;
    }

    get ObjVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjVer({
                obj_id: this.#native.object_version.object_info.obj_id,
                version: this.#native.object_version.version_info.version
            })
        }
        else return new CtrlDocs.ObjVer(this.#native.ObjVer);
    }
    
    GetNative() {
        return this.#native;
    }
}