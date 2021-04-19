
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

        var barSample = {
            otu_ids: bubbleSample.otu_ids.sort((a, b) => a - b).slice(0, 10).map(s => `${s}`),
            otu_labels: bubbleSample.otu_labels.sort((a, b) => a - b).slice(0, 10),
            sample_values: bubbleSample.sample_values.sort((a, b) => a - b).slice(0, 10)
        };

        // data.samples.forEach(s => {
        //     if (s.id == value) {

        //         bubbleSample = s
        //         for (i = 0; i < 10; i++) {
        //             barSample.otu_ids.push(`OTU ${s.otu_ids[i]}`);
        //             barSample.otu_labels.push(s.otu_labels[i]);
        //             barSample.sample_values.push(s.sample_values[i]);
        //         }
        //     barSample.otu_ids.sort((a, b) => a - b);
        //     barSample.otu_labels.sort((a, b) => a - b);
        //     barSample.sample_values.sort((a, b) => a - b);
        //     }
        // })

        console.log(barSample.otu_ids)
        console.log(bubbleSample)


        data.metadata.forEach(s => {
            if (s.id == value) {
                var subject = [];

                Object.entries(s).forEach(([key, value]) => {
                    subject.push(`${key}: ${value}`)
                })

                console.log(subject)

                d3.select("#sample-metadata").selectAll("h5")
                    .data(subject)
                    .enter()
                    .append("h5")
                    .text(d => d)
            }
        })

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
    



