module.exports = {
	"moduleNameMapper": {
		"^react-dom/server$": "<rootDir>/node_modules/preact-render-to-string/dist/index.js",
		"^react-addons-test-utils$": "<rootDir>/node_modules/preact-test-utils/lib/index.js",
		"^react$": "<rootDir>/node_modules/preact-compat-enzyme/lib/index.js",
		"^react-dom$": "<rootDir>/node_modules/preact-compat-enzyme/lib/index.js",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|scss)$": "identity-obj-proxy",
		"^react$": "preact-compat",
		"^react-dom$": "preact-compat"
	},
	"modulePathIgnorePatterns": ["<rootDir>/cypress/"],
	"transform": {".*": "<rootDir>/node_modules/jest-css-modules"},
    "testURL": "http://localhost:8080",
    "moduleFileExtensions": [
      "js",
      "jsx"
    ],
    "moduleDirectories": [
      "node_modules"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}"
    ]
}
