/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Plotly from './lib/PlotlyBasic';


const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <div id="chart"></div>
        </body>
    </html>
`

let data: any = [{
    x: [1999, 2000, 2001, 2002],
    y: [10, 15, 13, 17],
    type: 'scatter'
}];


const layout: any = {
    title: 'Sales Growth',
    xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'Percent',
        showline: false
    },
    width: 800,
    height: 500
};


const App = () => {
    const webViewRef = useRef<WebView>(null);

    const invoke = (str: string) => {
        if (webViewRef && webViewRef.current){
            webViewRef.current.injectJavaScript(str);
        }
    };

    const createPlot = (data: any, layout?: any, config?: any) => {
        invoke(`
            window.Plotly.newPlot(
                'chart',
                ${JSON.stringify(data)},
                ${JSON.stringify(layout)},
                ${JSON.stringify(config)}
                );
            `);
        };
    
    const updatePlot = (data: any, layout?: any, config?: any) => {
        let newData = data;
        newData[0].x.push(2003);
        newData[0].y.push(14);
        invoke(`
            window.Plotly.react(
                'chart',
                ${JSON.stringify(data)},
                ${JSON.stringify(layout)},
                ${JSON.stringify(config)}
                );
            `);
        };

    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                <Button
                    onPress={() => {createPlot(data, layout)}}
                    title="Create Plot"
                />
                <Button
                    onPress={() => {updatePlot(data, layout)}}
                    title="Update Plot"
                />
            </View>
            <View style={{flex: 1}}>
                <WebView
                    ref={webViewRef}
                    source={{html: html}}
                    onLoadEnd={() => { invoke(`eval(atob("${Plotly}"));`); }}
                    onMessage={() => {}}
                />
            </View>
        </View>
    );
}

export default App;

