CtrlDocs.JsUtils = class JsUtils {

    // Ensure a path exists on an object, creating {} where missing.
    // Returns the object at the end of the path.
    static EnsurePath (obj, keys) {
        if (obj == null || typeof obj !== "object") {
            throw new TypeError("obj must be a non-null object");
        }
        if (!Array.isArray(keys)) {
            throw new TypeError("keys must be an array of strings");
        }

        let cur = obj;
        for (const key of keys) {
            if (cur[key] == null || typeof cur[key] !== "object") {
                cur[key] = {};
            }
            cur = cur[key];
        }
        return cur;
    }

    static isNumber(value) {
        if (typeof value === 'number') return isFinite(value);
        if (typeof value !== 'string') return false;
        
        var trimmed = value.trim();
        if (trimmed === '') return false;
        
        return isFinite(trimmed) && !isNaN(trimmed - 0);
    };
}