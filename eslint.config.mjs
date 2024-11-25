import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    { languageOptions: { globals: globals.node } },
    {
        files: ["**/*.ts"],
        rules: {
            "no-unused-vars": "warn",
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "eol-last": ["error", "always"],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "args": "all",
                    "argsIgnorePattern": "^_",
                    "caughtErrors": "all",
                    "caughtErrorsIgnorePattern": "^_",
                }
            ],
            "@typescript-eslint/no-empty-object-type": "off"
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    moduleDirectory: ["node_modules", "src/"]
                }
            },
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];