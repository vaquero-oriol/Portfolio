module.exports = {
  extends: [
    'universe',
    'universe/native',
    'universe/web',
    'universe/shared/typescript-analysis',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint'],
  rules: {
    'import/order': 'off',
  },
  env: {
    node: true,
  },
  root: true,
};
