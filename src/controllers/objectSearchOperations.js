CtrlDocs.ObjectSearchOperations = class ObjectSearchOperations {
    #native;
    #nativeAsync;
    #vault;

    /**
     * @param vault {CtrlDocs.Vault}
     */
    constructor(vault) {
        this.#vault = vault;
        this.#native = vault.GetNative().ObjectSearchOperations;
        this.#nativeAsync = vault.GetNative().Async?.ObjectSearchOperations;
    }

    /**
     * Search for objects by conditions
     * @param searchConditions {CtrlDocs.SearchConditions}
     * @param {number} searchFlags
     * @param {boolean} sortResults
     * @param {number} maxResults
     * @param {number} searchTimeout
     * @returns {Promise<CtrlDocs.ObjID>}
     */
    SearchForObjectsByConditionsEx(searchConditions, searchFlags = 0, sortResults = false, maxResults = 0, searchTimeout = 0) {
        const errorMessage = `Search For Objects Failed`;

        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                this.#vault.GetNative().SearchOperations.SearchObjects({
                    conditions: searchConditions.GetNative(),
                    limit: maxResults,
                    timeout_in_seconds: searchTimeout
                })
                    .then(results => resolve(new CtrlDocs.ObjectSearchResults(results)))
                    .catch(errorObj => reject(CtrlDocs.MFilesError.GetVnextErrorHandler(errorMessage)(errorObj)))
            }
            else this.#nativeAsync.SearchForObjectsByConditionsEx(searchConditions.GetNative(), searchFlags, sortResults, maxResults, searchTimeout,
                (results) => resolve(new CtrlDocs.ObjectSearchResults(results)),
                (short, long, obj) => reject(CtrlDocs.MFilesError.GetLegacyAsyncErrorHandler(errorMessage)(short, long, obj)),
                function () {}
            );
        });
    }

    GetNative() {
        return this.#native;
    }
}