import babel from 'rollup-plugin-babel';

export default {
  input: './index.js',
  plugins: [
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            'modules': false,
            'useBuiltIns': 'usage',
            'corejs': 3
          }
        ]
      ],
      babelrc: false
    })
  ],
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    }
  ]
};
