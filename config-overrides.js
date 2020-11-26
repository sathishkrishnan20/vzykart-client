const path = require('path');
const {
    override,
    addBabelPlugins,
    babelInclude,
    addWebpackAlias
} = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
    }),
    ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
    babelInclude([
        path.resolve(__dirname, 'node_modules/react-native-elements'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        path.resolve(__dirname, 'node_modules/react-native-ratings'),
        path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
        path.resolve(__dirname, 'node_modules/react-native-otp-textinput'),
        path.resolve(__dirname, 'node_modules/react-native-picker-select'),
        path.resolve(__dirname, 'node_modules/react-native-sectioned-multi-select'),
        path.resolve(__dirname, 'node_modules/react-native-toast-message'),


        path.resolve(__dirname, 'src'),
    ])
);