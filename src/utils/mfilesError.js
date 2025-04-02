/**
 * A custom error class that uses the same API as a regular javascript error.
 */
CtrlDocs.MFilesError = class MFilesError {
    constructor(shortError, errorObj, title = undefined) {
        this.name = title ?? "An Error Occurred";
        this.message = shortError;
        if (CtrlDocs.Platform.IsNextGen()) {
            this.stack = errorObj.stack;
        } else {
            this.stack = CtrlDocs.Platform.Current === UixPlatform.LEGACY_WEB ? errorObj.Message : shortError;
        }
        //this.longError = longError;
        this.obj = errorObj;
    }

    /**
     * Function to return an error handler to be used in vnext api calls
     * @param errorTitle {string}
     * @return {(String) => (VnextError) => (CtrlDocs.MFilesError)}
     */
    static GetVnextErrorHandler(errorTitle) {
        return (errorObj) => {
            return new CtrlDocs.MFilesError(
                errorObj.message,
                errorObj,
                errorTitle
            )
        }
    }

    /**
     * Function to return an error handler to be used in vnext api calls
     * @param errorTitle {string}
     * @return {(string) => (string, string, object) => (CtrlDocs.MFilesError)}
     */
    static GetLegacyAsyncErrorHandler(errorTitle) {
        return (shortMessage, longMessage, errorObj) => {
            return new CtrlDocs.MFilesError(
                shortMessage,
                errorObj,
                errorTitle
            )
        }
    }
}

/**
 * @typedef {object} VnextError
 * @property {number} errorCode
 * @property {number} innerExceptionCode
 * @property {string} message
 * @property {string} shortMessage
 * @property {number} statusCode
 */