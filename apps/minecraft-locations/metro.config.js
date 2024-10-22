const { withNxMetro } = require("@nx/expo")
const { getDefaultConfig } = require("@expo/metro-config")
const { withTamagui } = require("@tamagui/metro-plugin")
const path = require("path")

const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver

const customConfig = {
  cacheVersion: "minecraft-locations",
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: ["svg", ...sourceExts, "cjs", "mjs"],
  },
}

const tamaguiConfig = withTamagui(customConfig, {
  isCSSEnabled: true,
  components: ["tamagui"],
  config: path.resolve(__dirname, "./tamagui.config.ts"),
  outputCSS: path.resolve(__dirname, "./tamagui-web.css"),
})

module.exports = withNxMetro(tamaguiConfig, {
  debug: false,
  extensions: ["ts", "tsx", "js", "jsx", "json", "svg"],
  watchFolders: [],
})
