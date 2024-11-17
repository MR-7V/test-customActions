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

  } catch (error) {
    console.log(error.message);
  }
})();
