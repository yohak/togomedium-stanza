module.exports = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.spec.json",
    },
  },
  transformIgnorePatterns: ["/node_modules/(?!togostanza/stanza)"],
  testMatch: ["**/**/*.spec.ts"],
  setupFilesAfterEnv: ["jest-extended/all"],
};
