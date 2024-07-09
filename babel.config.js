module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@src": './src/',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@store': './src/store',
          'i18n': './src/i18n',    
        },
      },
    ],
  ],
};
