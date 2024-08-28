
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FF9933',
                             '@font-family': 'Roboto, Helvetica, Arial, sans-serif',
                            // '@text-color': '#34314C',
                            // '@menu-item-color': '#34314C',
                            // '@layout-header-background': '#FFFFFF',
                            '@body-background': '#FFFFFF',
                          
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};