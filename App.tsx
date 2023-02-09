/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useRef, useCallback } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Plot from 'react-plotly.js';
import Plotly from './node_modules/plotly.js/dist/plotly-custom.min.js';


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
    console.log('injectJavaScript');
    document.getElementById('hello').style.backgroundColor = 'green';
    true;
`
var data: any = [{
    x: [1999, 2000, 2001, 2002],
    y: [10, 15, 13, 17],
    type: 'scatter'
}];


var layout: any = {
    title: 'Sales Growth',
    xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'Percent',
        showline: false
    }
};


const App = () => {
    const webViewRef = useRef<WebView>(null);

    const handleLoadEnd = useCallback(() => {
        console.log("handleLoadEnd");
        webViewRef.current?.injectJavaScript(javascript);
    },[])

    const invoke = (str: string) => {
        if (webViewRef && webViewRef.current)
            webViewRef.current.injectJavaScript(`(function(){${str}})()`);
    };
    
    const invokeEncoded = (str: string) => {
        invoke(`eval(atob("${str}"));`);
    };

    // invoke(JSON.stringify(Plotly));

    return (
        <View style={{flex: 1}}>
            <WebView
                ref={webViewRef}
                source={{html: html}}
                onLoadEnd={handleLoadEnd}
                onMessage={() => {}}
            />
        </View>
    );
}

export default App;

