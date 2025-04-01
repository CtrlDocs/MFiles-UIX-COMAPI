CtrlDocs.ObjectVersionAndProperties = class ObjectVersionAndProperties {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get ObjVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjVer(this.#native.obj_ver);
        }
        else return new CtrlDocs.ObjVer(this.#native.ObjVer);
    }

    get Properties() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.PropertyValues(this.#native.properties.value);
        }
        else return new CtrlDocs.PropertyValues(this.#native.Properties);
    }
    
    get VersionData() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjectVersion(this.#native.object_version);
        }
        else return new CtrlDocs.ObjectVersion(this.#native.VersionData);
    }
    
    GetNative() {
        return this.#native;
    }
}