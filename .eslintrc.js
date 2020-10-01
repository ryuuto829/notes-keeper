module.exports ={
  "parser": "babel-eslint",
  "plugins": [
    "prettier",
    "flowtype"
  ],
  "extends": [
    "react-app",
    "plugin:flowtype/recommended"
  ],
  "rules": {
    "max-len": ["error", { "code": 80, "tabWidth": 4 }],
    "flowtype/require-valid-file-annotation": [
      2,
      "always",
      {
        "annotationStyle": "line"
      }
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 80,
        "endOfLine": "auto"
      }
    ]
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
};
