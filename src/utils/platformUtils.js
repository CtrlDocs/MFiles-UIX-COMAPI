const UixPlatform = Object.freeze({
    UNDEFINED:   0,
    LEGACY_CLIENT:  1,
    LEGACY_WEB: 2,
    VNEXT_CLIENT: 'desktop',
    VNEXT_WEB: 'web'
}); 

if (typeof CtrlDocs.Platform === 'undefined') {
    CtrlDocs.Platform = {
        Current: UixPlatform.UNDEFINED
    };
}

CtrlDocs.Platform.GetPlatform = () => {
    if (!!MFiles?.CurrentApplicationPlatform && CtrlDocs.Platform.Current === UixPlatform.UNDEFINED) CtrlDocs.Platform.SetPlatform(MFiles.CurrentApplicationPlatform);
    return CtrlDocs.Platform.Current;
}

CtrlDocs.Platform.SetPlatform = (value) => {
    CtrlDocs.Platform.Current = value;
}

CtrlDocs.Platform.IsNextGen = () => {
    const platform = CtrlDocs.Platform.GetPlatform();
    
    if (platform == UixPlatform.UNDEFINED)
        throw new Error("The Uix Platform has not been set properly. Please use CtrlDocs.Platform.SetPlatform(id)")
    
    return platform === UixPlatform.VNEXT_WEB 
        || platform === UixPlatform.VNEXT_CLIENT;
}

CtrlDocs.Platform.IsLegacy = () => {
    const platform = CtrlDocs.Platform.GetPlatform();
    
    if (platform == UixPlatform.UNDEFINED)
        throw new Error("The Uix Platform has not been set properly. Please use CtrlDocs.Platform.SetPlatform(id)")
    
    return platform === UixPlatform.LEGACY_WEB 
        || platform === UixPlatform.LEGACY_CLIENT;
}