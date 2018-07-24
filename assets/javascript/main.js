// I got it to work!!!!!!!///////
// It was not logging onto my page. 


$(document).ready(function () {
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

    var database = firebase.database();

    $("#button-input").on("click", function (event) {
        event.preventDefault();

        $(".empty-form").hide();
        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#time-freq").val().trim();

        if (name != "" && destination != "" && trainTime != "" && frequency != "") {


            database.ref().push({
                name: name,
                destination: destination,
                trainTime: trainTime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            $("#train-form")[0].reset();
        } else {
            $("#empty-form").show();
        }
    });

    database.ref().on("child_added", function (childSnapshot) {

        var childName = childSnapshot.val().name;
        var childDestination = childSnapshot.val().destination;
        var childTrainTime = childSnapshot.val().trainTime;
        var childFrequency = childSnapshot.val().frequency;

        console.log("firebase" + childName);
        console.log("firebase" + childDestination);
        console.log("firebase" + childTrainTime);
        console.log("firebase" + childFrequency);

        var newRow = $("<tr>");
        var newName = $("<td>").attr("data-name", childName).text(childName);
        var newDestinaton = $("<td>").attr("data-name", childDestination).text(childDestination);
        var newRate = $("<td>").attr("data-name", childFrequency).text(childFrequency);

        // moment.js

        // convert start time
        var dateFormat = "HH:mm a";
        var convertedTime = moment(childTrainTime, dateFormat).subtract(1, "years");
        console.log(convertedTime);
        // logging current time
        var currentTime = moment();
        

        // difference in time
        var timeDiff = moment().diff(moment(convertedTime), "minutes");
        console.log("Difference in time: " + timeDiff);

        // check remainder of time diff and the frequency
        var timeRemain = timeDiff % childFrequency;
        
        //subtract the remainder from frequency to find the time for next train
        var timeNextTrain = childFrequency - timeRemain;
        
        // Next Train
        var nextTrain = moment().add(timeNextTrain, "minutes");
        
        var nextTrainFormat = moment(nextTrain).format("hh:mm a");

        // logging in the next train
        var nextArrival = $("<td>").text(nextTrainFormat);
        var minutesAway = $("<td>").text(timeNextTrain);

        newRow.append(newName, newDestinaton, newRate, nextArrival, minutesAway);
        $("#table-data").append(newRow);


    });


});