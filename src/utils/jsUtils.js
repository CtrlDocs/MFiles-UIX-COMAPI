if (typeof CtrlDocs.JsUtils === 'undefined') {
    CtrlDocs.JsUtils = {};
}

// Ensure a path exists on an object, creating {} where missing.
// Returns the object at the end of the path.
CtrlDocs.JsUtils.EnsurePath = (obj, keys) => {
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

CtrlDocs.JsUtils.isNumber = (value) => {
    try {
        const parsed = parseFloat(value);
        return !isNaN(parsed) && isFinite(parsed);  
    } catch (e) {
        return false;
    }
}