CtrlDocs.ObjectType = class ObjectType {
    #native;

    constructor(native) {
        this.#native = native;
    }

    get RealObjectType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.is_real_object_type;
        }
        else return this.#native.RealObjectType;
    }

    get ID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.id;
        }
        else return this.#native.ID;
    }

    get CanHaveFiles() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.options.can_have_files;
        }
        else return this.#native.CanHaveFiles;
    }

    get NameSingular() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.name_singular;
        }
        else return this.#native.NameSingular;
    }

    get NamePlural() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.name_plural;
        }
        else return this.#native.NamePlural;
    }

    get Name() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.name_singular;
        }
        else return this.#native.Name;
    }


    GetNative() {
        return this.#native;
    }
}