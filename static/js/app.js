// Read in JSON from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const path = "static/data/samples.json"

function getSubjectSample(data, subjectID){
  var samples = data["samples"];
  var matchingSamples = samples.filter(s => s["id"] == subjectID);
  var subjectSample = matchingSamples[0];
  return subjectSample;
}

function barChart(data, subjectID){
  console.log(`barChart ${subjectID}`);
  let subjectSample = getSubjectSample(data, subjectID); 
  const top10counts = subjectSample.sample_values.slice(0, 10).reverse();
  const top10OTUIds = subjectSample.otu_ids.slice(0, 10).reverse();
  const top10OTULabels = subjectSample.otu_labels.slice(0, 10).reverse();

  let yTicks = top10OTUIds.map(id => `OTU ${id}`);
  console.log(yTicks)

  let traces = [{
    x: top10counts,
    y: yTicks,
    text: top10OTULabels,
    type: "bar",
    orientation: "h"
  }];
      
  let layout = {
    height: 600,
    width: 800,
  };
      
  Plotly.newPlot("bar", traces, layout);
}

function bubbleChart(data, subjectID){
  console.log(`bubbleChart ${subjectID}`);
  let subjectSample = getSubjectSample(data, subjectID); 
  const otuIDs = subjectSample.otu_ids;
  const sampleValues = subjectSample.sample_values;
  const otuLabels = subjectSample.otu_labels;

  var bubbleData = [
    {
    x: otuIDs,
    y: sampleValues,
    text: otuLabels,
    mode: "markers",
    marker: {
      size: sampleValues,
      color: otuIDs,
      colorscale: "Jet"
    },
    // type: 'scatter'
  }
];

//   let plotData = [traces];

  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30}
  };
      
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}

// Create a bubble chart that displays each sample.

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

function metaData(data, subjectID){
  console.log(`metaData ${subjectID}`);
}

function updateVisuals(subjectID) {
  console.log(`updateVisuals ${subjectID}`);

  // assuming we have a subject ID (exists and is valid)
  d3.json(path).then(data => {
    if (subjectID === undefined){
      console.log("You passed in undefined")
      subjectID = data["names"][0];
    }
    barChart(data, subjectID);
    bubbleChart(data, subjectID);
    metaData(data, subjectID);
  })
}


function popDrop(data) {
  var subjectIDs = data["names"];
  var dropDown = d3.select("#selDataset");
  for (let id of subjectIDs){
    dropDown.append("option").attr("value", id).text(id);
  }
}
//subjectIDs.forEach(id => dropdown.append(...));

function init() {
  console.log("init");
  d3.json(path).then(popDrop);
  updateVisuals();  
}

init();
  

  