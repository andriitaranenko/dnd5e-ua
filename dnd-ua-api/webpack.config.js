const { composePlugins, withNx } = require('@nx/webpack');
const { merge } = require('webpack-merge')
const path = require('path')

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    const baseDirectory = path.resolve(config.output.path)
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return merge(config, {
      // overwrite values here
      entry: {
        seed: 'dnd-ua-api/src/app/seeder.ts',
      },
      output: {
        path: baseDirectory,
        filename: '[name].js',
        libraryTarget: 'commonjs',
      },
    })
  }
);
