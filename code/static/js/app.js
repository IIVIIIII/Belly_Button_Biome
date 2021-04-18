
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
                    sample.otu_ids.push(s.otu_ids[i]);
                    sample.otu_labels.push(s.otu_labels[i]);
                    sample.sample_values.push(s.sample_values[i]);
                }
            }
        })
        
        console.log(sample)

        var trace = {
            x: sample.otu_lables,
            y: sample.sample_values,
            type: "bar"
        }
    
        var layout = {
            title: "biodiversity",
            barmode: "group"
        }
    
        Plotly.newPlot("bar", [trace], layout);
    



    })

    

}
    



