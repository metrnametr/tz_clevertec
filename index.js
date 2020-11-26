require('ignore-styles');

require('babel-register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
      },
    ],
    'dynamic-import-node',
  ],
});
require('./server');
