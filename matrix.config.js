module.exports = {
    scopes: [
        "@matrix",
    ],
    folders: [
        "packages"
    ],
    templates: [
        '@matrix/template-rollup',
        '@matrix/template-webpack'
    ],
    platforms: [
        'node',
        'browser',
    ],
};