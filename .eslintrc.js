module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  "rules": {
    "prettier/prettier": "error",
    "import/no-webpack-loader-syntax": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "no-console": [
      1,
      {
        "allow": ["warn", "error"]
      }
    ]
  }
};
