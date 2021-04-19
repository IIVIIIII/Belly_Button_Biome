
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

        barSample = {
            otu_ids: bubbleSample.otu_ids.slice(0, 10).map(s => `OTU ${s}`).reverse(),
            otu_labels: bubbleSample.otu_labels.slice(0, 10).reverse(),
            sample_values: bubbleSample.sample_values.slice(0, 10).reverse()
        };

        console.log(barSample)
        console.log(bubbleSample)

         var subject = Object
            .entries(data.metadata.filter(s => s.id == value)[0])
            .map(([key, value]) => {return `${key}: ${value}`
        })

        console.log(subject)

        d3.select("#sample-metadata").selectAll("h5")
                    .data(subject)
                    .enter()
                    .append("h5")
                    .text(d => d)

        // data.metadata.forEach(s => {
        //     if (s.id == value) {
        //         var subject = [];

        //         Object.entries(s).forEach(([key, value]) => {
        //             subject.push(`${key}: ${value}`)
        //         })

        //         console.log(subject)

        //         d3.select("#sample-metadata").selectAll("h5")
        //             .data(subject)
        //             .enter()
        //             .append("h5")
        //             .text(d => d)
        //     }
        // })

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
            mode: "markers"
        }
    
        var layout = {
            title: "biodiversity",
        }
    
        Plotly.newPlot("bar", [barTrace], layout);

        Plotly.newPlot("bubble", [bubbleTrace], layout);
    

    })

    

}
    



