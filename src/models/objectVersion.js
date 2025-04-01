CtrlDocs.ObjectVersion = class ObjectVersion {
    #native;
    #vault;

    /**
     * 
     * @param native
     * @param vault {CtrlDocs.Vault}
     */
    constructor(native, vault) {
        this.#native = native;
        this.#vault = vault;
    }
    
    get Class() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.version_info.class_id;
        }
        else return this.#native.Class;
    }

    get ObjectCheckedOut() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.CheckedOutTo !== 0;
        }
        else return this.#native.ObjectCheckedOut;
    }

    get ObjectCheckedOutToThisUserOnThisComputer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.ObjectCheckedOutToThisUser;
        }
        else return CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_WEB
            ? this.#native.ObjectCheckedOutToThisUser
            : this.#native.ObjectCheckedOutToThisUserOnThisComputer;
    }

    get ObjectCheckedOutToThisUser() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#vault.SessionInfo.UserID === this.CheckedOutTo;
        }
        else return this.ObjectCheckedOutToThisUserOnThisComputer;
    }

    get CheckedOutTo() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.object_info.checked_out_to_user_id;
        }
        else return this.#native.CheckedOutTo;
    }

    get CheckedOutToUserName() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.object_info.checked_out_to_user_name;
        }
        else return this.#native.CheckedOutToUserName;
    }

    get ObjVer() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjVer({
                obj_id: this.#native.object_info.obj_id,
                version: this.#native.version_info.version
            });
        }
        else return new CtrlDocs.ObjVer(this.#native.ObjVer);
    }

    get Title() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.version_info.title;
        }
        else return this.#native.Title;
    }

    get CreatedUtc() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.DateTimeHelpers.protobufDateToJsDate(this.#native.object_info.created_at_utc);
        }
        else return this.#native.CreatedUtc;
    }

    get LastModifiedUtc() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.DateTimeHelpers.protobufDateToJsDate(this.#native.version_info.last_modified_at_utc);
        }
        else return this.#native.LastModifiedUtc;
    }

    get DisplayID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            // Return external id if available, otherwise return internal id
            return objectVersion.#native.object_info.external_id === '' 
                ? objectVersion.#native.object_info.obj_id.item_id.internal_id 
                : objectVersion.#native.object_info.external_id
        }
        else return this.#native.DisplayID;
    }

    get Files() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.ObjectFiles(this.#native.version_info.files);
        }
        else return new CtrlDocs.ObjectFiles(this.#native.Files);
    }
    
    GetNative() {
        return this.#native;
    }
}