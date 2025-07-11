CtrlDocs.ObjectOperations = class ObjectOperations {
    #native;
    #nativeAsync;
    #vault;

    /**
     * @param vault {CtrlDocs.Vault}
     */
    constructor(vault) {
        this.#vault = vault;
        this.#native = vault.GetNative().ObjectOperations;
        this.#nativeAsync = vault.GetNative().Async?.ObjectOperations;
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @param updateFromServer {boolean}
     * @returns {Promise<CtrlDocs.ObjectVersionAndProperties>}
     */
    GetObjectVersionAndProperties(objVer, updateFromServer = false) {
        const errorMessage = `Get Version and Properties Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_vers: [objVer.GetNative()],
                    data_request: {
                        required_data_flags: {
                            object_version: true,
                            properties: true
                        },
                        version_type: (objVer.Version === -1) ? 1 : 0
                    }
                };
                
                this.#native.GetObjectDataOfMultipleObjects(request)
                    .then(objectDataOfMultipleObjects => resolve(
                            new CtrlDocs.ObjectVersionAndProperties(objectDataOfMultipleObjects.results[0].object_data)
                        )
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else this.#nativeAsync.GetObjectVersionAndProperties(objVer.GetNative(), updateFromServer,
                (objectVersionAndProperties) => resolve(
                    new CtrlDocs.ObjectVersionAndProperties(objectVersionAndProperties)
                ),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                function () {
                }
            );            
        });
    }

    /**
     * Get the Object ID by its GUID
     * @param {string} guid 
     * @returns {Promise<CtrlDocs.ObjID>}
     */
    GetObjIDByGUID(guid) {
        const errorMessage = `Get ObjID By GUID Failed`;

        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                this.#native.GetObjIDByGUID(guid)
                    .then(objID => resolve(new CtrlDocs.ObjID(objID.obj_id)))
                    .catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else this.#nativeAsync.GetObjIDByGUID(guid,
                (objID) => resolve(new CtrlDocs.ObjID(objID)),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                function () {}
            );
        });
    }


    /**
     * @param objID {CtrlDocs.ObjID}
     * @param allowCheckedOut {boolean}
     * @param updateFromServer {boolean}
     * @returns {Promise<CtrlDocs.ObjVer>}
     */
    GetLatestObjVer(objID, allowCheckedOut = true, updateFromServer = false) {
        const errorMessage = `Get Latest ObjVer Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const requestedObjVer = new CtrlDocs.ObjVer({
                    obj_id: objID.GetNative(),
                    version: -1
                });
                return this.GetObjectInfo(requestedObjVer)
                    .then(objectVersion => resolve(objectVersion.ObjVer))
                    .catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorObj)));
                
            } else this.#nativeAsync.GetLatestObjVer(objID.GetNative(), allowCheckedOut, updateFromServer,
                (objVer) => resolve(
                    new CtrlDocs.ObjVer(objVer)
                ),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                function () {}
            );
        });
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @param latestVersion {boolean}
     * @param updateFromServer {boolean}
     * @returns {Promise<CtrlDocs.ObjectVersion>}
     */
    GetObjectInfo(objVer, latestVersion = true, updateFromServer = false) {
        const errorMessage = `Get Object Info Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_vers: [objVer.GetNative()],
                    data_request: {
                        required_data_flags: {
                            object_version: true
                        },
                        version_type: (objVer.Version === -1 || latestVersion) ? 1 : 0
                    }
                };
                
                this.#native.GetObjectDataOfMultipleObjects(request)
                    .then(objectDataOfMultipleObjects => resolve(
                            new CtrlDocs.ObjectVersion(objectDataOfMultipleObjects.results[0].object_data.object_version, this.#vault)
                        )
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else this.#nativeAsync.GetObjectInfo(objVer.GetNative(), latestVersion, updateFromServer,
                (objectVersion) => resolve(
                    new CtrlDocs.ObjectVersion(objectVersion, this.#vault)
                ),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                function () {}
            );
        });
    }

    /**
     * @param objID {CtrlDocs.ObjID}
     * @returns {Promise<CtrlDocs.ObjectVersion>}
     */
    CheckOut(objID) {
        const errorMessage = `Check Out Failed`; 
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_ids: [
                        objID.GetNative()
                    ]
                }

                this.#native.CheckOutMultiple(request)
                    .then(checkOutMultipleResponse => resolve(
                            new CtrlDocs.ObjectVersion(checkOutMultipleResponse.checked_out_versions[0].object_version, this.#vault)
                        )
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
                
            } else this.#nativeAsync.CheckOut(objID.GetNative(),
                (objectVersion) => resolve(
                    new CtrlDocs.ObjectVersion(objectVersion, this.#vault)
                ),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                () => {
                }
            );
        });
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @returns {Promise.<CrlDocs.ObjectVersion, CtrlDocs.PropertyValues>}
     */
    CheckIn(objVer) {
        const errorMessage = `Check In Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_vers: [
                        objVer.GetNative()
                    ]
                }

                this.#native.CheckInMultiple(request)
                    .then(checkInMultipleResponse => resolve({
                            objectVersion: new CtrlDocs.ObjectVersion(checkInMultipleResponse.results[0].latest_version.object_version, this.#vault),
                            propertyValues: new CtrlDocs.PropertyValues(checkInMultipleResponse.results[0].latest_version.properties)
                        })
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            } else this.#nativeAsync.CheckIn(objVer.GetNative(),
                (objectVersion) => resolve({
                    objectVersion: new CtrlDocs.ObjectVersion(objectVersion, this.#vault),
                    propertyValues: new CtrlDocs.PropertyValues()
                }),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                () => {
                }
            );
        });
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @returns {Promise<CtrlDocs.ObjectVersion>}
     */
    UndoCheckOut(objVer) {
        const errorMessage = `Undo Check Out Failed`; 
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_vers: [
                        objVer.GetNative()
                    ],
                    force: false
                }

                this.#native.UndoCheckoutMultiple(request)
                    .then(undoCheckOutMultipleResponse => resolve(
                            new CtrlDocs.ObjectVersion(undoCheckOutMultipleResponse.results[0].latest_version.object_version, this.#vault)
                        )
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else this.#nativeAsync.UndoCheckout(objVer.GetNative(), 
                (objectVersion) => resolve(
                    new CtrlDocs.ObjectVersion(objectVersion, this.#vault)
                ), 
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                () => {}
            );
        });
    }

    /**
     * @param window {number}
     * @param objVer {CtrlDocs.ObjVer}
     * @returns {Promise<CtrlDocs.ObjectWindowResult>}
     */
    ShowBasicEditObjectWindow(window, objVer) {
        const errorMessage = `Show Object Window Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                if (objVer.Version === -1) {
                    return this.GetLatestObjVer(objVer.ObjID)
                        .then(latestObjVer => this.ShowBasicEditObjectWindow(window, latestObjVer))
                        .then(resolve)
                        .catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)));
                }

                MFiles.ShowEditObjectWindow(objVer.GetNative(), {}).then(objectWindowResult => {
                    resolve(
                        new CtrlDocs.ObjectWindowResult(objectWindowResult)
                    )
                })
            }
            else {
                this.#nativeAsync.ShowBasicEditObjectWindow(window, objVer.GetNative(),
                    (objectWindowResult) =>
                        resolve(
                            new CtrlDocs.ObjectWindowResult(objectWindowResult)
                        )
                    ,(short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)) 
                );
            }
        });
    }

    /**
     * @param objID {CtrlDocs.ObjID}
     * @param version {number}
     * @param latest {boolean}
     * @param type {number}
     * @returns {string}
     */
    GetMFilesURLForObject(objID, version, latest, type) {
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return this.#native.GetMFilesURLForObject(objID.GetNative(), version, latest, type);
    }

    /**
     * @param objID {CtrlDocs.ObjID}
     * @returns {Promise<CtrlDocs.ObjectVersion>}
     */
    DeleteObject(objID) {
        const errorMessage = `Delete Object Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_ids: [
                        objID.GetNative()
                    ]
                }

                this.#native.RemoveObjects(request)
                    .then(deletedObjects => resolve(
                            new CtrlDocs.ObjectVersion(deletedObjects[0], this.#vault)
                        )
                    ).catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            } else return new CtrlDocs.ObjectVersion(
                this.#nativeAsync.DeleteObject(
                    objID.GetNative(),
                    (objectVersion) => resolve(new CtrlDocs.ObjectVersion(objectVersion, this.#vault)),
                    (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                    () => {}
                )
                , this.#vault);
        });
    }

    /**
     * @param window {number}
     * @param mode {number}
     * @param creationInfo {CtrlDocs.ObjectCreationInfo}
     * @param propertyValues {CtrlDocs.PropertyValues}
     * @param acl {CtrlDocs.ACL}
     * @returns {Promise<CtrlDocs.ObjectWindowResult>}
     */
    ShowPrefilledNewObjectWindow(window, mode, creationInfo, propertyValues, acl) {
        const errorMessage = `Show Prefilled Object Window Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                MFiles.ShowNewObjectWindow(
                    creationInfo.GetObjectType(),
                    creationInfo.GetNative(),
                    propertyValues.GetNative(),
                    acl.GetNative(),
                    {},
                ).then(objectWindowResult => {
                    resolve(
                        new CtrlDocs.ObjectWindowResult(objectWindowResult)
                    )
                })
            }
            else if (CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_CLIENT) {
                resolve(
                    new CtrlDocs.ObjectWindowResult(
                        this.#native.ShowPrefilledNewObjectWindow(window, mode,
                            creationInfo.GetNative(), propertyValues.GetNative(), acl.GetNative())
                    )
                );
            }
            else {
                this.#nativeAsync.ShowPrefilledNewObjectWindow(
                    window, mode,
                    creationInfo.GetNative(), propertyValues.GetNative(), acl.GetNative(),
                    (objectWindowResult) =>
                        resolve(
                            new CtrlDocs.ObjectWindowResult(objectWindowResult)
                        )
                    ,(short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj))
                );
            }
        });
    }

    /**
     * @param objVer {CtrlDocs.ObjVer}
     * @returns {Promise<CtrlDocs.ObjectVersionAndPermissions>}
     */
    GetObjectPermissions(objVer) {
        const errorMessage = `Get Object Permissions Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                // TODO, but it is currently not in use anywhere, so fine for now
            }
            else if (CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_CLIENT) {
                resolve(
                    new CtrlDocs.ObjectVersionAndPermissions(
                        this.#native.GetObjectPermissions(objVer.GetNative())
                    )
                );
            }
            else {
                this.#nativeAsync.GetObjectPermissions(objVer.GetNative(),
                    (objectVersionAndPermissions) => resolve(
                        new CtrlDocs.ObjectVersionAndPermissions(
                            objectVersionAndPermissions
                        )
                    ),
                    (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                    () => {}
                );
            }
        });
    }

    GetNative() {
        return this.#native;
    }
}