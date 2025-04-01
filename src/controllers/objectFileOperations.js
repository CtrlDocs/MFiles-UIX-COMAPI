CtrlDocs.ObjectFileOperations = class ObjectFileOperations {
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
     * @returns {Promise<CtrlDocs.ObjectFiles>}
     */
    GetFiles(objVer) {
        const errorMessage = `Get Files Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const request = {
                    obj_vers: [objVer.GetNative()],
                    data_request: {
                        required_data_flags: {
                            object_version: true
                        },
                        version_type: (objVer.Version === -1) ? 1 : 0
                    }
                };

                this.#vault.GetNative().ObjectOperations.GetObjectDataOfMultipleObjects(request)
                    .then(objectDataOfMultipleObjects => resolve(
                            new CtrlDocs.ObjectFiles(objectDataOfMultipleObjects.results[0].object_data.object_version.version_info.files)
                        )
                    ).catch(errorObj => reject(getVnextErrorHandler(errorMessage)(errorObj)))
            }
            else if (CtrlDocs.Platform.GetPlatform() === UixPlatform.LEGACY_CLIENT) {
                resolve(
                    new CtrlDocs.ObjectFiles(
                        this.#native.GetFiles(objVer.GetNative())
                    )
                );
            }
            else {
                this.#nativeAsync.GetFiles(objVer.GetNative(),
                    (files) => resolve(
                        new CtrlDocs.ObjectFiles(
                            files
                        )
                    ), 
                    (short, long, obj) => reject(getLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                    function () {}
                );
            }
        });
    }

    #openMethodToString = (method) => {
        switch (method) {
            case 0: return undefined
            case 1: return undefined
            case 2: return "Read"
            case 3: return "Edit"
        }
    }
    
    /**
     * @param window {number}
     * @param objVer {CtrlDocs.ObjVer}
     * @param fileVer {CtrlDocs.FileVer}
     * @param method {number}
     * @returns {void}
     */
    OpenFileInDefaultApplication(window, objVer, fileVer, method) {
            if (CtrlDocs.Platform.IsNextGen()) {
                this.#vault.ObjectOperations.GetObjectInfo(objVer, objVer.Version === -1, true)
                    .then(objectVersion => {
                        this.#vault.ShellFrame.GetNative().Commands
                        .ExecuteCommand(CtrlDocs.Platform.Current === UixPlatform.VNEXT_CLIENT
                            ? MFiles.BuiltinCommand.LaunchDefaultApp
		                    : MFiles.BuiltinCommand.OpenInDesktopApp,
                            {
                                //OpenMode: this.#openMethodToString(method), // TODO
                                ObjectsInfo: {
                                    ObjectVersions: [
                                        objectVersion.GetNative()
                                    ],
                                    ObjectFiles: [
                                        //{
                                        //    parent: objectVersion.GetNative(),
                                        //    file_ver: fileVer.GetNative()
                                        //}
                                    ]
                                }
                            });
                });
            }
            else this.#nativeAsync.OpenFileInDefaultApplication(window, objVer.GetNative(), fileVer.GetNative(), method);
    }

    /**
     * @param objId {CtrlDocs.ObjID}
     * @param objVersion {number}
     * @param fileId {number}
     * @param fileVersion {number}
     * @param latestSpecificBehavior {number}
     * @param updateFromServer {boolean}
     * @returns {string}
     */
    GetPathInDefaultView(objId, objVersion, fileId, fileVersion, latestSpecificBehavior = 3, updateFromServer = false){
        if (CtrlDocs.Platform.IsNextGen()) {
            // TODO
        }
        else return this.#native.GetPathInDefaultView(objId.GetNative(), objVersion, fileId, fileVersion, latestSpecificBehavior, updateFromServer);
    }

    GetNative() {
        return this.#native;
    }
}