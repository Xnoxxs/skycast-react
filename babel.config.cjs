// Expo's babel preset + module-resolver for clean path aliases.
// expo/internal/babel-preset is the preset Expo uses internally —
// it includes all transforms (TypeScript, JSX, reanimated, etc.)
// babel-plugin-module-resolver maps #app, #shared, #features aliases
// to their real directory paths so Metro can resolve them at bundle time.
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["expo/internal/babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // These must match the paths in tsconfig.json
            "#app": "./src/app",
            "#shared": "./src/shared",
            "#features": "./src/features",
          },
        },
      ],
    ],
  }
}
