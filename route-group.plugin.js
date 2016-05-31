import {mergeRoute, inheritGroupConfig} from './lib/route-group.helper.js';

var plugin = class extends Quantum.Model.Plugin {
    build(atom) {
        let config = atom.config;

        if (config.inherits) {
            inheritGroupConfig(config);
        }

        _.each(config.routes, (value, path) => {
            let routeConfig = {};
            let newPath = config.prefix + path;

            if (typeof(value) == 'function') {
                routeConfig.action = value;
            } else if (typeof(value) == 'string') {
                routeConfig.template = value;
            } else if (_.isObject(value)) {
                routeConfig = value;
            }

            mergeRoute(routeConfig, config);

            QF.add('route', newPath, routeConfig);
        });

        return config;
    }

    schema() {
        return {
            prefix: {type: String, optional: true},
            inherits: {type: String, optional: true},
            allowedRoles: {type: [String], optional: true},
            triggersEnter: {type: [Function], defaultValue: []},
            triggersExit: {type: [Function], defaultValue: []},
            routes: {type: Object, blackbox: true, optional: true}
        }
    }
};

Quantum.instance.plugin('route-group', plugin);