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

// function metaData(data, subjectID){
//    console.log(`metaData ${subjectID}`);
//    var demogs = data["metadata"].filter(subjectID);
// //    var metadataList = d3.select("ul");
// //    metadataList.append("ul").text(demogs.ethnicity);
// let li2 = d3.select("ul").append("li").text(demogs.ethnicity);
// }

// //   let li3 = d3.select("#sample-metadata").text(demogs.gender);
// //   let li4 = d3.select("#sample-metadata").text(demogs.age);
// //   let li5 = d3.select("#sample-metadata").text(demogs.location);
// //   let li6 = d3.select("#sample-metadata").text(demogs.bbtype);
// //   let li7 = d3.select("#sample-metadata").text(demogs.wfreq);
  

// //          <div id="sample-metadata" class="panel-body"></div>

function metaData(data, subjectID) {
    console.log(`metaData ${subjectID}`);
    var demogs = data["metadata"].find(item => item.id === subjectID);
 
    // Clear the existing list content before appending new data
    var metadataList = d3.select("ul");
    metadataList.html(""); // Clear the existing content
 
    // Append demographic information to the list
    metadataList.append("li").text(`Ethnicity: ${demogs.ethnicity}`);
    metadataList.append("li").text(`Gender: ${demogs.gender}`);
    metadataList.append("li").text(`Age: ${demogs.age}`);
    metadataList.append("li").text(`Location: ${demogs.location}`);
    metadataList.append("li").text(`BB Type: ${demogs.bbtype}`);
    metadataList.append("li").text(`WFreq: ${demogs.wfreq}`);
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
  

  