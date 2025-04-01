CtrlDocs.ObjectVersionAndPermissions = class ObjectVersionAndPermissions {
    #native;

    constructor(native) {
        this.#native = !native ? ObjectVersionAndPermissions.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {} // TODO
        } else return new MFiles.ObjectVersionAndPermissions();
    }

    get AccessControlList() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return new CtrlDocs.ACL(this.#native.AccessControlList);
    }

    get NamedACL() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return this.#native.NamedACL;
    }

    get CustomACL() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return this.#native.CustomACL;
    }

    get ObjVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return new CtrlDocs.ObjVer(this.#native.ObjVer);
    }
    
    GetNative() {
        return this.#native;
    }
}