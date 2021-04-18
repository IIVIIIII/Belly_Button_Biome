
d3.json("samples.json").then(function (data) {

    var options = d3.select("#selDataset").selectAll("option");

    options.data(data.names)
        .enter()
        .append("option")
        .attr("id", id => id)
        .text(d => d)

});

function optionChanged(value) {

    d3.json("samples.json").then(function (data) {

        sample = {
            otu_ids: [],
            otu_labels: [],
            sample_values: []
        }

        data.samples.forEach(function(s) {
            if (s.id == value) {
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

        var trace = {
            x: sample.sample_values,
            y: sample.otu_ids,
            text: sample.otu_labels,
            orientation: "h",
            type: "bar"
        }
    
        var layout = {
            title: "biodiversity",
        }
    
        Plotly.newPlot("bar", [trace], layout);
    



    })

    

}
    



