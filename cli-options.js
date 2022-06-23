// Dependencies
const { ArgumentParser } = require('argparse');

// Set arguments for CLI
const parser = new ArgumentParser();

parser.add_argument('--keywords', { 
    help: 'Keywords for job searching' 
});

// Export parser variable
module.exports = { parser };