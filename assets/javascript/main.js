$(document).ready(function(){
    console.log("Hello World");

    // Firebase
    var config = {
        apiKey: "AIzaSyAVZigYyaaL42MBup0HSN3n34Mc5cCtp0o",
        authDomain: "train-schedule-94ae9.firebaseapp.com",
        databaseURL: "https://train-schedule-94ae9.firebaseio.com",
        projectId: "train-schedule-94ae9",
        storageBucket: "train-schedule-94ae9.appspot.com",
        messagingSenderId: "316977571972"
      };
      
      firebase.initializeApp(config);
      console.log(firebase);

      var dataRef = firebase.database();

      // Initial valus
      var trainName = "";
      var destination = "";
      var trainTime = "";
      var frequency = "";


      // code for storing and retrieving the most recent user
      $("#button-input").on("click", function(event){
          event.preventDefault();

          trainName = $("#train-name").val().trim();
          destination = $("#train-destination").val().trim();
          trainTime = $("#train-time").val().trim();
          frequency = $("#time-freq").val().trim();

    // code for push
    dataRef.ref().push({

        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        
    });

      });

    // firebase watcher + initial loader
    dataRef.ref().on("child_added", function(childSnapshot){
    // log what is coming from snapshot    
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().trainTime);
        console.log(childSnapshot.val().frequency);
        
        var newRow = $("<tr>");
        var newName = $("<td>").attr("data-name", childName).text(childName);
        var newDestinaton = $("<td>").attr("data-name", childDestination).text(childDestination);
        var newRate = $("<td>").attr("data-name", childFrequency).text(childFrequency);
    
        // moment.js
// convert start time
    var dateFormat = "HH:mm a";
    var convertedTime = moment(childTrainTime, dateFormat).subract(1, "years");
    console.log(convertedTime);
// logging current time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm a"));

// difference in time
    var timeDiff = moment().diff(moment(convertedTime), "minutes");
    console.log("Difference in time: " + timeDiff);
    
// check remainder of time diff and the frequency
    var timeRemain = timeDiff % childFrequency;
    console.log(timeRemain);

//subtract the remainder from frequency to find the time for next train
    var timeNextTrain = childFrequency - timeRemain;
    console.log("Next Train: " + timeNextTrain);

// Next Train
    var nextTrain = moment().add(timeNextTrain, "minutes");
    console.log("Arrive Time: " + moment(nextTrain).format("hh:mm a"));
    var nextTrainFormat = moment(nextTrain).format("hh:mm a");

// logging in the next train
var nextArrival = $("<td>").text(nextTrainFormat);
var minutesAway = $("<td>").text(timeNextTrain);

newRow.append(newName, newDestinaton, newRate, nextArrival, minutesAway);
$("#table-body").append(newRow);


    });

    });