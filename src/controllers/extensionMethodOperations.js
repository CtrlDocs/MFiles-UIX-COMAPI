CtrlDocs.ExtensionMethodOperations = class ExtensionMethodOperations {
    #native;
    #nativeAsync;

    constructor(native, nativeAsync) {
        this.#native = native;
        this.#nativeAsync = nativeAsync;
    }

    /**
     * @param methodIdentifier {string}
     * @param data {string}
     * @returns {Promise<string>}
     */
    ExecuteVaultExtensionMethod(methodIdentifier, data) {
        const errorMessage = `Executing "${methodIdentifier}" Failed`;
        
        return new Promise((resolve, reject) => {
            if (CtrlDocs.Platform.IsNextGen()) {
                const input = {
                    method_name: methodIdentifier,
                    input: data
                };

                this.#native
                    .RunExtensionMethod(input)
                    .then(response => resolve(response.output))
                    .catch(error => reject(getVnextErrorHandler(errorMessage)(error)));
            }
            else {
                this.#nativeAsync.ExecuteVaultExtensionMethod(methodIdentifier, data,
                    resolve,
                    (short, long, obj) => {
                        reject(getLegacyAsyncErrorHandler(errorMessage)(short, long, obj));
                    },
                    () => {}
                );
            }
        });
    }
    
    GetNative() {
        return this.#native;
    }
}