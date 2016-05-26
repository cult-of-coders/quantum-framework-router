Router Configuration
=======================
```
Q('route', {
    'layoutTemplate': 'App_Layout', // these are the defaults values
    'notFoundTemplate': 'App_NotFound', // these are the defaults values
    'notAuthorizedTemplate': 'App_NotAuthorized' // these are the defaults values
})
```

Create a template named after that name:

```
<template name="App_Layout">
    {{> Template.dynamic template=main}}
</template>
```

Define a route
======================
```
Q('route /homepage', {
    name: 'home', // optional
    allowedRoles: ['USER'] // optional, uses roles service from Quantum
    template: 'App_Homepage',
    layout: 'App_Layout' // optional it will default to the main one.
});
```

```
Q('route /homepage', {
    name: 'home', // optional
    allowedRoles: ['USER'], // optional, uses roles service from Quantum
    action(params, queryParams) {
        BlazeLayout.render('customTemplate', {main: 'somethingThatDependsOnParams'})
    }
});
```


Define a group
======================
```
Q('route-group admin', {
  extends: 'other-group', // it will inherit the configuration of the group
  prefix: '/admin',
  allowedRoles: ['ADMIN'], // allowedRoles always overrides parent (same applies to individual route config)
  layout: 'Custom_Layout',  // layout always overrides the parent
  triggersEnter: [], 
  triggersExit: [],
  routes: {
    '/path/x': 'template',
    '/path2': function() {},
    '/path3': {
        // custom config that is inherited from group
     }
  }
});

Q('route-group admin.users', {
    inherits: 'admin',
    prefix: '/users',
    routes: {
    }
});
```
