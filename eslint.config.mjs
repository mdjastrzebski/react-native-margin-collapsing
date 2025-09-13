import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(compat.extends('@react-native', 'prettier')),
    plugins: { prettier, "simple-import-sort": simpleImportSort, },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
       "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^node:", "^@?\\w", "^"], ["^\\."]],
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'lib/'],
  },
]);
