import React, { ReactElement, useRef } from 'react';
import { Button, View } from 'react-native';
import { PlotlyWebView, PlotlyWebViewHandle } from '@sea-birdscientific/typescript-data-visualization/dist'


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


const App = (): ReactElement => {
    const plotlyWebViewRef = useRef<PlotlyWebViewHandle>(null)
    return (
        <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
            <Button
                onPress={() => {
                    if (plotlyWebViewRef && plotlyWebViewRef.current){
                        plotlyWebViewRef.current.createPlot(data, layout)
                    }
                }}
                title="Create Plot"
            />
            <Button
                onPress={() => {
                    if (plotlyWebViewRef && plotlyWebViewRef.current){
                        plotlyWebViewRef.current.updatePlot(data, layout)
                    }
                }}
                title="Update Plot"
            />
        </View>
        <View style={{flex: 1}}>
            <PlotlyWebView
                ref={plotlyWebViewRef}
                data={data}
                layout={layout}
            />
        </View>
    </View>

    );
}

export default App;

