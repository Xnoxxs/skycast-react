import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  // Build/tooling config files are not part of the app source and use a
  // CommonJS/Node environment, so they're excluded from the strict app lint
  // (mirrors Expo's tsconfig.base which excludes babel/metro/jest config files).
  globalIgnores(["dist/", "web-build/", "babel.config.cjs"]),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  config,
  {
    // configs overrides, if need
  },
)
