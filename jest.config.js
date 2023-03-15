module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/tests/config/setup-env.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/config/setup.ts"],
  moduleNameMapper: {
    "\\.(css|png|svg)$": "identity-obj-proxy",
    "^api(.*)$": "<rootDir>/src/api$1",
    "^core(.*)$": "<rootDir>/src/core$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^helpers(.*)$": "<rootDir>/src/helpers$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^services(.*)$": "<rootDir>/src/services$1",
    "^store(.*)$": "<rootDir>/src/store$1",
    "^tests(.*)$": "<rootDir>/src/tests$1",
    "^utils(.*)$": "<rootDir>/src/utils$1"
  }
};
