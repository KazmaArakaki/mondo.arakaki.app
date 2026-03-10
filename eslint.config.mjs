import stylistic from "@stylistic/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";

const eslintConfig = [
  // 全体への適用外
  {
    ignores: [
      ".next/**",
      ".pnpm-store",
      "node_modules/**",
    ],
  },

  // TypeScriptの推奨設定
  ...ts.configs.recommended,

  {
    plugins: {
      "@stylistic": stylistic,
      "import": importPlugin,
      "simple-import-sort": simpleImportSort,
    },
  },

  // Next.jsアプリ固有の設定
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // メインのルール設定（型チェックが必要なソースコードのみ）
  {
    files: [
      "**/*.{ts,tsx}",
    ],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: [
          "tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // --- フォーマット・スタイル (Stylistic) ---
      "comma-dangle": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/object-curly-newline": ["error", {
        "ObjectPattern": { "multiline": true, "minProperties": 2 },
        "ImportDeclaration": { "multiline": true, "minProperties": 3 }
      }],
      "@stylistic/object-property-newline": ["error", {
        "allowAllPropertiesOnSameLine": false,
      }],

      // --- インポート/エクスポートの並び替え ---
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // --- JSX関連 ---
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-indent": ["error", 2],
      "@stylistic/jsx-closing-tag-location": ["error", "tag-aligned"],
      "@stylistic/jsx-one-expression-per-line": ["error"],
      "@stylistic/jsx-wrap-multilines": ["error", {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line",
      }],
    },
  },

  // 設定ファイル自身のパースエラー回避用
  {
    files: ["eslint.config.ts"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
];

export default eslintConfig;
