/** @type {import('jest').Config} */
export default {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^(\\./.*)\\.js$": "$1",
  },
  testEnvironment: "jsdom",
};
