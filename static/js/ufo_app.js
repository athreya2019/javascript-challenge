
// assign dataset
var tableData = data;

// initial display of all UFO sightings
tableDisplay(tableData);

// function to display UFO sightings
function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// clear the table before populating new data
function deleteTbody() {
 d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
// 'Reset or Filter Table' button
var button = d3.select("#filter-btn");

// filter the dataset per filter criteria
button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteTbody();
  
  var filteredData = tableData;
  var inputId = document.getElementsByClassName("form-control");
  
  // iterate through the input fields
  for (var i = 0; i < inputId.length; i++) {
	
	var idName = inputId[i].id;
	var field = d3.select("#" + idName).property("value");
	
	if (field.trim() !== "") {
	  var filteredData = filteredData.filter(ufoSighting =>
	   	ufoSighting[idName].toUpperCase().trim() === 
			field.toUpperCase().trim());
	};
  };
  
 
  // display message if no records found
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
      .attr("colspan", 7)
      .html("<h4>No Records Found For The Selected Criteria(s)</h4>");
  };
  
  // display the database
  
  tableDisplay(filteredData);
});