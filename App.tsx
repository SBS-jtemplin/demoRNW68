/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';


const html = `
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style> #hello {background-color: red;} </style>
  </head>
  <body>
    <p id="hello">Hello WebView</p>
  </body>
</html>
`

const javascript = `
    console.log('injectedJavaScript');
    document.getElementById('hello').style.backgroundColor = 'green';
    true;
`

const App = () => {

  let handleLoadEnd = () => {
    console.log('onLoadEnd');
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        useWebView2={true}
        source={{ html: html }}
        onMessage={() => {}}
        onLoadEnd={handleLoadEnd}
        injectJavaScript={javascript}
        injectedJavaScriptBeforeContentLoaded={javascript}
      />
    </View>
  );
};

export default App;
