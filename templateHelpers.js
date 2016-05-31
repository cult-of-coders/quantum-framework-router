Template.registerHelper('onRoute', function(route) {
    return (FlowRouter.getRouteName() === route);
});

Template.registerHelper('pathFor', function(pathDef, kw) {
    let params = kw ? kw.hash : {};

    return FlowRouter.path(pathDef, params);
});
