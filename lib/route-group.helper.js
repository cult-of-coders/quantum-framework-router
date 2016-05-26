export function mergeRoute(routeConfig, groupConfig) {
    routeConfig.triggersEnter = routeConfig.triggersEnter || [];
    routeConfig.triggersExit = routeConfig.triggersExit || [];

    routeConfig.triggersEnter = _.union(routeConfig.triggersEnter, groupConfig.triggersEnter);
    routeConfig.triggersExit = _.union(routeConfig.triggersExit, groupConfig.triggersExit);

    if (groupConfig.allowedRoles && routeConfig.allowedRoles === undefined) {
        routeConfig.allowedRoles = groupConfig.allowedRoles;
    }
    if (groupConfig.layout && routeConfig.layout === undefined) {
        routeConfig.layout = groupConfig.layout;
    }
}

export function inheritGroupConfig(config) {
    let parentConfig = QF.use('route-group', config.inherits);

    if (parentConfig.prefix) {
        config.prefix = parentConfig.prefix + config.prefix;
    }

    if (parentConfig.allowedRoles && config.allowedRoles === undefined) {
        config.allowedRoles = parentConfig.allowedRoles;
    }

    if (parentConfig.layout && config.layout === undefined) {
        config.layout = parentConfig.layout;
    }

    config.triggersEnter = _.union(config.triggersEnter, parentConfig.triggersEnter);
    config.triggersExit = _.union(config.triggersExit, parentConfig.triggersExit);
}