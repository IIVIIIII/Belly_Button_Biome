
d3.json("samples.json").then(data => {

    var options = d3.select("#selDataset").selectAll("option");

    options.data(data.names)
        .enter()
        .append("option")
        .attr("id", id => id)
        .text(d => d)

});

function optionChanged(value) {

    d3.json("samples.json").then(data => {

        var bubbleSample = data.samples.filter(s => s.id == value)[0];

        scale = d3.scaleLinear()
            .domain([0, d3.max(bubbleSample.sample_values)])
            .range([0, 100])
        
        bubbleSample.sizes = bubbleSample.sample_values.map(s => scale(s))

        barSample = {
            otu_ids: bubbleSample.otu_ids.slice(0, 10).map(s => `OTU ${s}`).reverse(),
            otu_labels: bubbleSample.otu_labels.slice(0, 10).reverse(),
            sample_values: bubbleSample.sample_values.slice(0, 10).reverse()
        };

         var subject = Object
            .entries(data.metadata.filter(s => s.id == value)[0])
            .map(([key, value]) => {return `${key}: ${value}`
        })

        d3.select("#sample-metadata").selectAll("h5")
        .remove()

        d3.select("#sample-metadata").selectAll("h5")
            .data(subject)
            .enter()
            .append("h5")
            .text(d => d)

        var barTrace = {
            x: barSample.sample_values,
            y: barSample.otu_ids,
            text: barSample.otu_labels,
            orientation: "h",
            type: "bar"
        }

        var bubbleTrace = {
            x: bubbleSample.otu_ids,
            y: bubbleSample.sample_values,
            text: bubbleSample.otu_labels,
            mode: "markers",
            marker: {
                size: bubbleSample.sizes
            }
        }


        var gaugeTrace = {
            domain: { x: [0, 1], y: [0, 1] },
            value: data.metadata.filter(s => s.id == value)[0].wfreq,
            title: { text: "Wash Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {axis: {range: [0, 9]}}
        };
        
        var gaugeLayout = {margin: { t: 0, b: 0 } };

        


    
        var barLayout = {
            title: "Highest sample values",
        }
    
        var bubbleLayout = {
            title: "All sample values",
        }

        Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);

        Plotly.newPlot("bar", [barTrace], barLayout);

        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
    

    })

    

}
    



