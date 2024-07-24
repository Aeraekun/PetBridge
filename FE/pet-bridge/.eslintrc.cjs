module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true, // Jest 테스트 환경 설정
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:react-redux/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "jest", "react-redux"],
  rules: {
    "react/react-in-jsx-scope": "off",
    // import에 대한 규칙 설정
    "import/no-unresolved": "error",
    "react/prop-types": "off",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "prettier/prettier": ["error", {endOfLine: "auto"}],
  },
  settings: {
    react: {version: "detect"},
    "import/resolver": {
      node: {
        // 모듈 해석을 위한 옵션 설정
        extensions: [".js", ".jsx", ".ts", ".tsx"], // 사용할 파일 확장자
        paths: ["./src"], // 모듈 경로
      },
    },
  },
}
