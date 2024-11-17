const core = require("@actions/core");

try {
  // Get the 'age' input
  const ageInput = core.getInput("age");
  const age = parseInt(ageInput, 10);

  if (isNaN(age)) {
    core.setFailed("Invalid age input. Please provide a valid number.");
    return;
  }

  if (age >= 18) {
    console.log("You are eligible to proceed.");
  } else {
    console.log("You are not eligible to proceed. Stopping the workflow.");
    process.exit(1); // Exit with a non-zero code
  }
} catch (error) {
  core.setFailed(error.message);
}
