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
}

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




//   Create a horizontal bar chart with a dropdown menu 
//   to display the top 10 OTUs found in that individual.

//   Use sample_values as the values for the bar chart.

// const top10OTUs = data.sample_values.slice(0, 10);
// //   Use otu_ids as the labels for the bar chart.
// const top10OTUIds = data.otu_ids.slice(0, 10);
// //   Use otu_labels as the hovertext for the chart.
// const top10OTULabels = data.otu_labels.slice(0, 10);

// Display the default plot
// function barPrototype() {
//     let data = [{
//       values: top10OTUs,
//       labels: top10OTUIds,
//       type: "bar"
//     }];
  
//     let layout = {
//       height: 600,
//       width: 800
//     };
  
//     Plotly.newPlot("bar", data, layout);
//   }
  
init();
  
  // d3.json(url)
  // .then(function(data) {   
  // });

  