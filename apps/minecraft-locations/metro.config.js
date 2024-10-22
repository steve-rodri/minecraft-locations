const { withNxMetro } = require("@nx/expo")
const { getDefaultConfig } = require("@expo/metro-config")
const { withTamagui } = require("@tamagui/metro-plugin")
const { mergeConfig } = require("metro-config")
const path = require("path")

const defaultConfig = getDefaultConfig(__dirname)
const { assetExts } = defaultConfig.resolver

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: "your-app-name",
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: ["js", "jsx", "json", "ts", "tsx", "mjs", "cjs", "svg", "css"], // Ensure that dynamic imports work with these extensions
  },
}

const tamaguiConfig = withTamagui(defaultConfig, {
  components: ["tamagui"],
  config: path.resolve(__dirname, "./tamagui.config.ts"),
  outputCSS: path.resolve(__dirname, "./tamagui-web.css"),
})

module.exports = withNxMetro(mergeConfig(tamaguiConfig, customConfig), {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx', 'json'
  extensions: [],
  // Specify folders to watch, in addition to Nx defaults (workspace libraries and node_modules)
  watchFolders: [],
})
