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
import Plotly from './lib/PlotlyBasic';


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
            <div id="chart"></div>
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

    
    const invoke = (str: string) => {
        webViewRef?.current?.injectJavaScript(`(function(){${str}})()`);
    };
    
    const invokeEncoded = (str: string) => {
        invoke(`eval(atob("${str}"));`);
    };
    
    const createPlot = (data: any, layout?: any, config?: any) => {
        invoke(`
            window.Plotly.newPlot(
                'chart',
                ${JSON.stringify(data)},
                ${JSON.stringify(layout)},
                ${JSON.stringify(config)}
                ).then(function() {
                    window.ReactNativeWebView.postMessage('Chart Loaded');
                });
            `);
        };
        
    const handleLoadEnd = useCallback(() => {
        console.log("handleLoadEnd");
        webViewRef?.current?.injectJavaScript(javascript);
        invokeEncoded(Plotly);
        createPlot(data, layout);
    },[])

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

