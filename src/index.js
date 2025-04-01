if (typeof CtrlDocs === 'undefined') {
    CtrlDocs = {};
}

const modelsContext = require.context('./models', true, /\.js$/);
modelsContext.keys().forEach(modelsContext);

const utilsContext = require.context('./utils', true, /\.js$/);
utilsContext.keys().forEach(utilsContext);

const controllersContext = require.context('./controllers', true, /\.js$/);
controllersContext.keys().forEach(controllersContext);