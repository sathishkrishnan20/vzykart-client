# React Native Web with TypeScript

Android Build Issue
To Fix

```
 1. /usr/libexec/java_home -V | grep jdk
 2. export JAVA_HOME=Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
 3. export PATH=$JAVA_HOME/bin:$PATH
```

Babel Issue

{
test: /\.(js|mjs)$/,
       exclude: /@babel(?:\/|\\{1,2})runtime/,
       loader: require.resolve('babel-loader'),
       options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [
                  ['module:metro-react-native-babel-preset'], // Add this line,
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    {helpers: true},
                  ],
                ],
            cacheDirectory: true,
            plugins: [
                  ["@babel/plugin-transform-flow-strip-types"],
                  ["@babel/plugin-proposal-class-properties"]
                  [
                    'module-resolver',
                    {
                      alias: {
                        '^react-native$': 'react-native-web',
},
},
],
],
// See #6846 for context on why cacheCompression is disabled
cacheCompression: false,

            // Babel sourcemaps are needed for debugging into node_modules
            // code.  Without the options below, debuggers like VSCode
            // show incorrect code and set breakpoints on the wrong lines.
            sourceMaps: shouldUseSourceMap,
            inputSourceMap: shouldUseSourceMap,
          },

},```

https://github.com/software-mansion/react-native-gesture-handler/issues/1076

![image](https://i.imgur.com/sa5z3DR.gif)

### Featuring

- iOS
- Android
- Web
- Typescript
- React-Navigation
- Jest
- Eslint

### Install brew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install dependencies

```sh
brew install node
brew install watchman
sudo gem install cocoapods
npm i -g yarn
```

### Install code

```sh
git clone git@github.com:ethanneff/react-native-web-typescript.git
cd react-native-web-typescript
yarn install
cd ios
pod install
```

### Run

```sh
yarn ios
```

```sh
yarn android
```

```sh
yarn web
```

### Lint

```sh
yarn lint
```

### Test

```sh
yarn test
```

### Deploy

```sh
yarn build
```
