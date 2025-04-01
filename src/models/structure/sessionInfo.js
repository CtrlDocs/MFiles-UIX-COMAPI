CtrlDocs.SessionInfo = class SessionInfo {
    #native;
    #nativeAsync;
    #vault;

    /**
     * 
     * @param native
     * @param nativeAsync
     * @param vault {CtrlDocs.Vault}
     */
    constructor(native, nativeAsync, vault) {
        this.#native = native;
        this.#nativeAsync = nativeAsync;
        this.#vault = vault;
    }

    get LicenseAllowsModifications() {
        if (CtrlDocs.Platform.IsNextGen()) {
            const editableLicenseTypes = [
                'LICENSE_TYPE_NAMED_USER_LICENSE', 
                'LICENSE_TYPE_CONCURRENT_USER_LICENSE'];
            
            return editableLicenseTypes.indexOf(this.#native.license_type) !== -1;
        }
        else return this.#native.LicenseAllowsModifications;
    }

    get VaultGUID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.vault_data.vault_attachment;
        }
        else return this.#native.VaultGUID;
    }
    
    get UserID() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.vault_data.user_id;
        }
        else return this.#native.UserID;
    }

    /**
     * @param acl {CtrlDocs.ACL}
     * @param desiredAccess {any}
     * @returns {Promise<boolean>}
     */
    CheckObjectAccess(acl, desiredAccess) {
        const errorMessage = `Check Object Access Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                // TODO
            }
            else if (CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_CLIENT) {
                resolve(
                    this.#native.CheckObjectAccess(acl.GetNative(), desiredAccess)
                );
            }
            else {
                this.#nativeAsync.CheckObjectAccess(acl.GetNative(), desiredAccess,
                    (result) => resolve(result),
                    (short, long, obj) => reject(getLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                    function () {}
                );
            }
        });
    }
    
    GetNative() {
        return this.#native;
    }
}