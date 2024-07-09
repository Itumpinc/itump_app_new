const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
  (acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off';
    return acc;
  },
  {},
);

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Path to your tsconfig.json file
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    ...a11yOff,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        bracketSpacing: true,
        bracketSameLine: true,
        arrowParens: 'avoid',
        trailingComma: 'all',
        semi: false,
        useTabs: false,
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/no-danger': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': 'off', // Remove this line if you want to enable the rule
    'react/no-unused-prop-types': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // 'no-console': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'off', // Turn off the rule for using 'typeof' with 'Provider'
  },
};
