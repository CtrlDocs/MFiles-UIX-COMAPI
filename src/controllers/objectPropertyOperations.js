CtrlDocs.ObjectPropertyOperations = class ObjectPropertyOperations {
    #native;
    #nativeAsync;
    #vault;

    constructor(native, nativeAsync, vault) {
        this.#native = native;
        this.#nativeAsync = nativeAsync;
        this.#vault = vault;
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
                    }).catch(errorObj => reject(getVnextErrorHandler(errorMessage)(errorObj)))
            }
            else {
                this.#nativeAsync.SetProperties(
                    objVer.GetNative(), propertyValues.GetNative(),
                    (objectVersionAndProperties) => resolve(
                        new CtrlDocs.ObjectVersionAndProperties(objectVersionAndProperties)
                    ), (short, long, obj) => reject(getLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
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