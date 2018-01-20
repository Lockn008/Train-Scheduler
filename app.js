var config = {
	apiKey: "AIzaSyAssXDSlA665X9h48CSfPdlTUSRlhOrRgY",
	authDomain: "train-times-e807a.firebaseapp.com",
	databaseURL: "https://train-times-e807a.firebaseio.com",
	projectId: "train-times-e807a",
	storageBucket: "train-times-e807a.appspot.com",
	messagingSenderId: "429492864276"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

var trainName = "";
var destination = "";
var firstDeparture = "";
var freq = 0;

dataRef.ref().on("child_added", function(snapshot) {
	trainName = snapshot.val().trainName;
	destination = snapshot.val().destination;
	firstDeparture = snapshot.val().firstDeparture;
	freq = snapshot.val().freq;

	var firstDepartureAlt = moment(firstDeparture, "HH:mm");  //shows the first departure time tomorrow
	var currentTime = moment();
	console.log(currentTime);
	console.log(firstDepartureAlt);
	var difference = currentTime.diff(firstDepartureAlt, 'minute'); //shows the time since the first departure
	console.log(difference);
	var minElapseToNextArrival = Math.ceil(difference/freq) * freq;
	console.log(minElapseToNextArrival);
	var nextArrivalTime = firstDepartureAlt.add(minElapseToNextArrival, 'minutes');
	console.log(nextArrivalTime);
	var nextArrivalAlt = moment(nextArrivalTime);
	var nextArrival = moment(nextArrivalTime).format("hh:mm A")
	var timeUntil = nextArrivalAlt.diff(currentTime, 'minute');
	console.log(timeUntil);





	var tableBod = $("tbody");
	var tr = $("<tr>");

	var td1 = $("<td>");
	td1.text(trainName);

	var td2 = $("<td>");
	td2.text(destination);

	var td3 = $("<td>");
	td3.text(freq);

	var td4 = $("<td>");
	td4.text(nextArrival); //must make correct variable, just seeing how times are handled

	var td5 = $("<td>");
	td5.text(timeUntil);

	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(td4);
	tr.append(td5);
	tableBod.append(tr);

}, function(errorObject) {
	console.log("Error: " + errorObject);
});

$("#submit").on("click", function() {
	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstDeparture = $("#first-train-time").val().trim();
	freq = $("#frequency").val().trim();

	dataRef.ref().push({
		trainName: trainName,
		destination: destination,
		firstDeparture: firstDeparture,
		freq: freq
	})
});


