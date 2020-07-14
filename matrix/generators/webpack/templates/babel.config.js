module.exports = function(api) {
    api.cache(true);
  
    const presets = [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: "> 0.25%, not dead",
        }
      ]
    ];
    const plugins = [
    //   [
    //     "@babel/plugin-transform-runtime",
    //     {
    //       regenerator: true,
    //       useESModules: true
    //     }
    //   ],
        ["@babel/plugin-proposal-object-rest-spread"]

    ];
  
    return {
      presets,
      plugins
    };
  };
  