CtrlDocs.ObjectPropertyOperations = class ObjectPropertyOperations {
    #native;
    #nativeAsync;
    #vault;

    /**
     * @param vault {CtrlDocs.Vault}
     */
    constructor(vault) {
        this.#vault = vault;
        this.#native = vault.GetNative().ObjectPropertyOperations;
        this.#nativeAsync = vault.GetNative().Async?.ObjectPropertyOperations;
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @param propertyValues {CtrlDocs.PropertyValues}
     * @returns {Promise<CtrlDocs.ObjectVersionAndProperties>}
     */
    SetProperties(objVer, propertyValues) {
        const errorMessage = `Set Properties Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    properties: [
                        {
                            obj_ver: objVer.GetNative(),
                            set_properties: propertyValues.GetNative(),
                            is_full_set: false,
                            allow_modifying_checked_in_object: true
                        }
                    ]
                }

                this.#vault.GetNative().ObjectOperations.SetPropertiesMultiple(request)
                    .then(results => {
                        const extObjectInfo = results.results[0];
                        resolve(
                            new CtrlDocs.ObjectVersionAndProperties({
                                obj_ver: extObjectInfo.original_obj_ver,
                                properties: extObjectInfo.latest_version.properties
                            })
                        )
                    }).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else {
                this.#nativeAsync.SetProperties(
                    objVer.GetNative(), propertyValues.GetNative(),
                    (objectVersionAndProperties) => resolve(
                        new CtrlDocs.ObjectVersionAndProperties(objectVersionAndProperties)
                    ), (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                    function () {
                    }
                );
            }
        });
    }
    
    GetNative() {
        return this.#native;
    }
}