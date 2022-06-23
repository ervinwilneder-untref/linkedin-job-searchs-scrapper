const fs = require('fs');

module.exports = {
    // Delay function replacing waitFor() deprecated puppeteer function
    delay: function (time) {
        return new Promise(function(resolve) { 
           setTimeout(resolve, time)
        });
    }
};