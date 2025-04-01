CtrlDocs.FolderDefType = Object.freeze({
    UNKNOWN: 0,
    ANY_FOLDER: 1,
    VIEW_FOLDER: 2,
    PROPERTY_FOLDER: 3,
    TRADITIONAL_FOLDER: 4,
    SEARCH_FOLDER: 5,
    EXTERNAL_VIEW_FOLDER: 6
});

CtrlDocs.FolderDef = class FolderDef {
    #native;

    constructor(native) {
        this.#native = !native ? FolderDef.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                type: CtrlDocs.FolderDefType.UNKNOWN,
                data: {}
            }
        } else return new MFiles.FolderDef();
    }
    
    get View() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.data.view_folder.id;
        }
        else return this.#native.View;
    }
    set View(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.data.view_folder = { id: value };
        } else if (CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_WEB) {
            this.#native.View = value;
        }
        else this.#native.SetView(value);
    }
    
    SetView(viewId) {
        this.View = viewId;
        if (CtrlDocs.Platform.IsNextGen()) {
            this.FolderDefType = CtrlDocs.FolderDefType.VIEW_FOLDER;
        }
    }

    get FolderDefType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.type;
        }
        else return this.#native.FolderDefType;
    }
    set FolderDefType(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.type = value;
        }
        else this.#native.FolderDefType = value;
    }
    
    GetNative() {
        return this.#native;
    }
}