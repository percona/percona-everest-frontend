/**
 * @see https://bit.dev/reference/eslint/eslint-config
 */
module.exports = {
  extends: [require.resolve('@teambit/react.react-env/config/eslintrc')],
  rules: {
    'no-nested-ternary': ['off'],
    'jest/no-done-callback': ['off'],
    'react/require-default-props': ['off'],
    'react/prop-types': ['off'],
    'react/destructuring-assignment': ['off'],
  },
};
