CtrlDocs.ShellListing = class ShellListing {
    #native;

    constructor(native) {
        this.#native = native;
    }

    // Methods

    /**
     * Sets the virtual selection to the provided objects or files in the current listing
     * @param objOrFileVers {CtrlDocs.ObjOrFileVers}
     * @returns {Promise<void>}
     */
    SetVirtualSelection(objOrFileVers) {
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                return this.#native.SetVirtualSelection(objOrFileVers.GetNative());
            } else {
                try {
                    this.#native.SetVirtualSelection(objOrFileVers.GetNative());
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    /**
     * Refreshes the object metadata in the current listing
     * @param objId {CtrlDocs.ObjID}
     * @param refreshFromServer {boolean}
     * @param updateRelatedObjects {boolean}
     * @returns {Promise<void>}
     * @constructor
     */
    RefreshObject(objId, refreshFromServer, updateRelatedObjects) {
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                return this.#native.RefreshObject(objId.GetNative(), refreshFromServer, updateRelatedObjects);
            } else {
                try {
                    this.#native.RefreshObject(objId.GetNative(), refreshFromServer, updateRelatedObjects);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    /**
     * Refreshes the current listing
     * @returns {Promise<void>}
     */
    RefreshListing() {
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                return this.#native.RefreshListing();
            } else {
                try {
                    this.#native.RefreshListing();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    GetNative() {
        return this.#native;
    }
}