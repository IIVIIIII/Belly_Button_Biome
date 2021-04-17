
d3.json("samples.json").then(function (data) {

    var options = d3.select("#selDataset").selectAll("option");
//
    options.data(data.names)
        .enter()
        .append("option")
        .attr("id", id => id)
        .text(d => d)

});

function optionChanged(value) {

    var sample = {}

    d3.json("samples.json").then(function (data) {
        

        
        function get() {
            data.samples.forEach(function(s) {
                if (s.id == value) {
                    sample = s
                }
            })
        }
        get()

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
}






