function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
      if (uiBHK[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Use the correct URL for the API endpoint
  var url = "/predict_home_price"; // Assuming you have updated this in your Flask app

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  }, function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log("Document loaded");
  // Use the correct URL to fetch locations
  var url = "/get_location_names"; // Assuming this is your Flask API endpoint

  $.get(url, function(data, status) {
      console.log("Got response for get_location_names request");
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty(); // Clear existing options
          for (var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

// Call onPageLoad when the window loads
window.onload = onPageLoad;
