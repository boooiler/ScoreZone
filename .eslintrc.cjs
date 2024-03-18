module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "simple-import-sort"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "semi": [
      "warn",
      "never"
    ],
    "simple-import-sort/imports": ["error", {
      groups: [
        // Importy zewnętrzne
        ['^\\u0000'],
        // Importy modułów z node_modules
        ['^react', '^@?\\w'],
        // Inne importy
        ['^'],
        // Importy styli
        ['^.+\\.s?css$'],
      ],
    }],
    "simple-import-sort/exports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "prefer-const": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/ban-types": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "warn",
    "no-var": "warn",
    "arrow-parens": [
      "warn",
      "as-needed",
      {
        "requireForBlockBody": true
      }
    ],
    "object-curly-newline": [
      "error",
      {
        "consistent": true
      }
    ],
    "object-curly-spacing": [
      "warn",
      "always"
    ],
    "comma-dangle": [
      "warn",
      "never"
    ],
    "max-classes-per-file": 0,
    "space-before-function-paren": [
      "warn",
      "always"
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "warn",
          "error"
        ]
      }
    ],
    "func-names": [
      "error",
      "never"
    ],
    "operator-linebreak": [
      "warn",
      "before"
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "react/jsx-one-expression-per-line": 0,
    "indent": [
      "warn",
      2
    ],
    "import/extensions": 0,
    "prefer-destructuring": [
      "warn",
      {
        "array": true,
        "object": true
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "react/destructuring-assignment": [
      1,
      "always"
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "lines-between-class-members": 0,
    "no-async-promise-executor": 0,
    "import/no-extraneous-dependencies": 0,
    "no-bitwise": 0,
    "object-property-newline": 0,
    "no-continue": 0,
    "no-restricted-syntax": 0,
    "camelcase": 0,
    "no-underscore-dangle": 0,
    "no-await-in-loop": 1,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "no-unused-vars": "off",
    "no-undef": 0,
    "no-plusplus": 0,
    "jsx-a11y/media-has-caption": 0,
    "no-constant-condition": 1,
    "no-dupe-args": 2,
    "no-dupe-else-if": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-extra-semi": 1,
    "no-extra-boolean-cast": 1,
    "no-sparse-arrays": 2,
    "no-template-curly-in-string": 1,
    "no-unexpected-multiline": 1,
    "no-unreachable": 1,
    "no-unsafe-finally": 1,
    "no-unsafe-negation": 1,
    "use-isnan": 2,
    "no-func-assign": 2,
    "no-import-assign": 2,
    "no-invalid-regexp": 2,
    "array-callback-return": 1,
    "block-scoped-var": 2,
    "class-methods-use-this": 0,
    "complexity": 0,
    "consistent-return": 1,
    "curly": [
      "warn",
      "multi-line"
    ],
    "dot-location": [
      "warn",
      "property"
    ],
    "dot-notation": 1,
    "no-case-declarations": 1,
    "no-constructor-return": 2,
    "no-else-return": 1,
    "no-eq-null": 1,
    "no-fallthrough": 1,
    "no-global-assign": 2,
    "no-invalid-this": 2,
    "no-lone-blocks": 1,
    "no-loop-func": 1,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 1
      }
    ],
    "no-redeclare": 2,
    "no-return-await": 1,
    "no-return-assign": 2,
    "no-self-assign": [
      "warn",
      {
        "props": false
      }
    ],
    "no-self-compare": 1,
    "no-throw-literal": 1,
    "no-unmodified-loop-condition": 1,
    "no-useless-return": 1,
    "require-await": 1,
    "react/no-string-refs": 0,
    "react/no-find-dom-node": 0,
    "react/jsx-key": 0,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  },
  parserOptions: {
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  overrides: [
    {
      "files": [
        "**/*.ts?(x)"
      ]
    }
  ]
}
