
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

        sample = {
            otu_ids: [],
            otu_labels: [],
            sample_values: []
        }
        
        var bubbleSample = {}

        data.samples.forEach(s => {
            if (s.id == value) {
                bubbleSample = s
                for (i = 0; i < 10; i++) {
                    sample.otu_ids.push(`OTU ${s.otu_ids[i]}`);
                    sample.otu_labels.push(s.otu_labels[i]);
                    sample.sample_values.push(s.sample_values[i]);
                }
            sample.otu_ids.sort((a, b) => a - b);
            sample.otu_labels.sort((a, b) => a - b);
            sample.sample_values.sort((a, b) => a - b);
            }
        })

        console.log(sample)
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
            x: sample.sample_values,
            y: sample.otu_ids,
            text: sample.otu_labels,
            orientation: "h",
            type: "bar"
        }

        var bubbleTrace = {
            x: bubbleSample.otu_ids,
            y: bubbleSample.sample_values,
            text: sample.otu_labels,
            mode: "markers"
        }
    
        var layout = {
            title: "biodiversity",
        }
    
        Plotly.newPlot("bar", [barTrace], layout);

        Plotly.newPlot("bubble", [bubbleTrace], layout);
    



    })

    

}
    



