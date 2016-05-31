let roles = QF.use('service', 'roles');
let roleChecker = function (allowedRoles) {
    return function (context, redirect, stop) {
        try {
            roles.check(Meteor.userId(), allowedRoles);
        } catch (e) {
            let template = Q('route').config('notAuthorizedTemplate');
            BlazeLayout.render(template);
            stop();
        }
    }
};

var plugin = class extends Quantum.Model.Plugin {
    build(atom) {
        let routeConfig = _.clone(atom.config);

        if (routeConfig.allowedRoles && routeConfig.allowedRoles.length) {
            routeConfig.triggersEnter = _.union(routeConfig.triggersEnter, roleChecker(routeConfig.allowedRoles));
        }

        let layoutTemplate = routeConfig.layout || this.config('layoutTemplate');

        if (!routeConfig.action) {
            routeConfig.action = function() {
                BlazeLayout.render(layoutTemplate, {main: routeConfig.template});
            };
        }

        return FlowRouter.route(atom.name, routeConfig);
    }

    schema() {
        return {
            name: {type: String, optional: true},
            allowedRoles: {type: [String], optional: true},
            template: {type: null, blackbox: true, optional: true},
            layout: {type: String, optional: true},
            triggersEnter: {type: [Function], defaultValue: []},
            action: {type: Function, optional: true},
            triggersExit: {type: [Function], defaultValue: []}
        }
    }

    configure(config) {
        this._currentConfig = _.extend({
            layoutTemplate: 'App_Layout',
            notAuthorizedTemplate: 'App_NotAuthorized',
            notFoundTemplate: 'App_NotFound'
        }, config);

        FlowRouter.notFound = {
            action: () => {
                BlazeLayout.render(this.config('notFoundTemplate'));
            }
        }
    }

    configSchema() {
        return {
            'layoutTemplate': {type: String, optional: true},
            'notAuthorizedTemplate': {type: String, optional: true},
            'notFoundTemplate': {type: String, optional: true}
        }
    }
};

Quantum.instance.plugin('route', plugin);