Package.describe({
    name: 'cultofcoders:quantum-framework-router',
    version: '1.0.1',
    // Brief, one-line summary of the package.
    summary: 'Based on Flow Router, this plugin allows you to easily create routes within Quantum Framework',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cult-of-coders/quantum-framework-router.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');

    api.use([
        'ecmascript',
        'templating',
        'cultofcoders:quantum-framework@1.1.8_5',
        'kadira:flow-router@2.12.1',
        'kadira:blaze-layout@2.3.0'
    ]);

    api.imply([
        'kadira:flow-router@2.12.1',
        'kadira:blaze-layout@2.3.0'
    ]);

    api.addFiles([
        'route.plugin.js',
        'route-group.plugin.js'
    ]);

    api.addFiles([
        'extension.js',
        'templateHelpers.js'
    ], 'client')
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
});
