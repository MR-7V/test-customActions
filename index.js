const core = require("@actions/core");
const fs = require("fs/promises");
const axios = require("axios");

const category = core.getInput('category') || 'Afrid';
const readme_path = core.getInput('readme_path') || 'README.md';

(async () => {
  try {
    // Fetch the quote from API
    const { data } = await axios.get(
      `https://api.agify.io/?name=${category}`
    );

    let qotd = data.age;
    let quote = `<!-- start quote -->\n`;
    quote = quote.concat(`${category} Your Age is : "${qotd}"\n<!-- end quote -->`);

    // Rewrite README with new qotd
    const currentText = await fs.readFile('./README.md', "utf8");
    const quoteSection = /<!-- start quote -->[\s\S]*<!-- end quote -->/g;
    const newText = currentText.replace(quoteSection, quote);

    await fs.writeFile('./README.md', newText);

    // Check age and exit with appropriate code
    if (qotd < 50) {
      console.log("Age is below 50");
      process.exit(1); // Exit with code 1
    } else {
      console.log("Age is 50 or above");
      process.exit(0); // Exit with code 0
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    process.exit(1); // Exit with error code in case of an exception
  }
})();
