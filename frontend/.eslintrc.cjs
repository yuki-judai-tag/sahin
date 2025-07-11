module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
       "plugin:react-hooks/recommended",
    ],
    ignorePatterns:["dist",".esclintrc.cjs"],
    parserOptions: { ecmaVersion:"latest", sourceType: "module" },
    settings: {react: {version: "18.2"}},
    plugins: ["react-refresh"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-no-target-blank": "off",
        "react-refresh/only-export-components": ["warn",
        {allowConstantExport: true},
    ],
},
}