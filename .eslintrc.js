module.exports = {
  "extends": [
    "plugin:react/recommended",
    "hughx"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "quotes": ["error", "double"],
    "react/jsx-curly-spacing": ["error", {"when": "always", "children": true}],
    "consistent-return": 0
  }
};
