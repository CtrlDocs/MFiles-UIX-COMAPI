CtrlDocs.ObjectCreationInfo = class ObjectCreationInfo {
    #native;

    constructor(native) {
        this.#native = !native ? ObjectCreationInfo.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                check_in_immediately_enabled: true
            }
        } else return new MFiles.ObjectCreationInfo();
    }
    
    // Methods
    SetObjectType(objectType, editable) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.object_type = objectType;
        }
        else this.#native.SetObjectType(objectType, editable);
    }

    GetObjectType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.object_type;
        }
        else return this.#native.GetObjectType();
    }

    SetSingleFileDocument(singleFile, editable) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.single_file_document = singleFile;
        }
        else this.#native.SetSingleFileDocument(singleFile, editable);
    }
    
    GetNative() {
        return this.#native;
    }
}