// MODALES

const modaleGuideConfig = (params) => {
    // console.log("modaleGuideConfig");
    log_mode && console.log('modaleGuideConfig');
    return {
        onOpen: params.onOpen,
        onClose: params.onClose,
        modaleClass: params.modaleClass,
        containerClass: params.containerClass,
        contentClass: params.contentClass,
        // "label"
        // "short_descr"
        // "descr"
        // "wxv25"
        // "icon"
        content: modaleGuideConfigHTML(),
    };
};