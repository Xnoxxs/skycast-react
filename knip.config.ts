import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: ["dist/**", "web-build/**"],
  // eslint-config-expo is kept for SDK 56 compatibility/tooling parity even
  // though the project's flat config extends @christopherjbaker/eslint-config.
  ignoreDependencies: ["expo-updates", "expo-system-ui", "eslint-config-expo"],
  // Babel is provided transitively by Expo (no direct @babel/* dependency), so
  // knip's Babel plugin doesn't auto-enable. Point it at the config explicitly
  // so babel.config.cjs and its plugins (babel-plugin-module-resolver) count as used.
  babel: {
    config: ["babel.config.cjs"],
  },
}

export default config
