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
  const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const currentHour = new Date(currentTime).getHours();

  console.log(`Current EST time: ${currentTime}`);
  console.log(`Current EST hour: ${currentHour}`);
  console.log(`User-defined time range: ${startTime} to ${endTime}`);

  // Check if the current time is within the user-defined range
  if (currentHour >= startTime && currentHour < endTime) {
    console.log("Current time is within the specified range. Proceeding to the next job.");
  } else {
    console.log("Current time is NOT within the specified range. Stopping the workflow.");
    process.exit(1); // Exit with a non-zero code
  }
} catch (error) {
  core.setFailed(error.message);
}
