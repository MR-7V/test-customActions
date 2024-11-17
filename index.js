const core = require("@actions/core");

try {
    // Get the inputs
    const startTimeInput = core.getInput("start_time");
    const endTimeInput = core.getInput("end_time");

    // Parse the inputs
    const startTime = parseInt(startTimeInput, 10);
    const endTime = parseInt(endTimeInput, 10);

    if (isNaN(startTime) || isNaN(endTime)) {
        core.setFailed("Invalid inputs. Start time and end time must be valid numbers.");
        return;
    }

    // Get the current EST time
    const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Toronto"
    });
    const currentHour = new Date(currentTime).getHours();

    console.log(`Current EST time: ${currentTime}`);
    console.log("*******************************");
    console.log("***   MAINTENANCE WINDOW    ***");
    console.log(`***   Start Time: ${startTime}:00:00   ***`);
    console.log(`***   End Time  : ${endTime}:00:00   ***`);
    console.log("*******************************");


    // Check if the current time is within the user-defined range
    if (currentHour >= startTime && currentHour < endTime) {
        console.log("***********************");
        console.log("*** MAINTENANCE ***");
        console.log("*** Within the maintenance window - PROCEEDING TO DEPLOYMENT ***");
        console.log("***********************");
        core.setOutput("is_within_time_range", "true");
    } else {
        console.log("***********************");
        console.log("*** ALERT ***");
        console.log("*** Current time is out of maintenance window - STOPPING DEPLOYMENT. ***");
        console.log("***********************");
        core.setOutput("is_within_time_range", "false");
        process.exit(1); // Exit with a non-zero code
    }
} catch (error) {
    core.setFailed(error.message);
}