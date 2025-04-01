CtrlDocs.ShellListing = class ShellListing {
    #native;

    constructor(native) {
        this.#native = native;
    }
    
    // Methods

    /**
     * @param objOrFileVers {CtrlDocs.ObjOrFileVers}
     */
    SetVirtualSelection(objOrFileVers) {
        this.#native.SetVirtualSelection(objOrFileVers.GetNative());
    }

    /**
     * 
     * @param objId {CtrlDocs.ObjID}
     * @param refreshFromServer {boolean}
     * @param updateRelatedObjects {boolean}
     * @constructor
     */
    RefreshObject(objId, refreshFromServer, updateRelatedObjects) {
        this.#native.RefreshObject(objId.GetNative(), refreshFromServer, updateRelatedObjects);
    }
    
    GetNative() {
        return this.#native;
    }
}