import React, { ReactElement } from 'react';
import { PlotlyWebView } from '@sea-birdscientific/typescript-data-visualization/dist/DataVisualization'


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
    return (
        // <></>
        <PlotlyWebView
            // data={data}
            // layout={layout}
        />
    );
}

export default App;

