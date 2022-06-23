// Dependencies
const puppeteer = require('puppeteer-core');
const fetch = require('node-fetch');
const fs = require('fs');

// Config files
const config = require('./config');
const tools = require('./tools');
const { parser } = require('./cli-options');

// Get CLI arguments
const args = parser.parse_args();

// Handle arguments
let keywords = ['try'].concat(args.keywords.split(','));
let today = new Date().toLocaleDateString();

// Init empty variables
const jobs = new Array();

// Main proccess
(async () => {

    try {
        
        // Launch browser and get opened tab
        const browser = await puppeteer.launch(config.PUPPETEER_OPTIONS);
        const [page] = await browser.pages();
        
        for (let k of keywords) {

            // Go to LinkedIn job search page
            await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${k}&location=Argentina&f_TPR=r604800&f_E=2`, {"waitUntil" : "networkidle2"});

            // Clear Local Storage on first try to avoid LinkedIn authwall
            await page.evaluate(() => localStorage.clear());

            // Scroll page down to get all results
            await page.evaluate(() => {
                var scrollInterval = setInterval(function() { 
                    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                }, 500);
                // to implement: document.querySelector('.jobs-search-results-list').scrollTo({ left: 0, top: document.querySelector('.jobs-search-results-list').scrollHeight, behavior: "smooth" })
            });

            // Wait to reach bottom page
            await tools.delay(10000);

            // Save all job searchs
            await page.evaluate(() => {
                jobs = []

                document.querySelectorAll('ul.jobs-search__results-list li').forEach(e => jobs.push({
                    'rol':e.innerText.split('\n')[0], 
                    'info':e.innerText.split('\n').slice(2), 
                    'link':e.querySelector('a').href}));
                
                // to implement: ul.scaffold-layout__list-container li

                return jobs;
            })
            .then(data => { 
                if (k != 'try') {
                    jobs.push({
                        'keyword': k,
                        'jobSearchs': data,
                        'date': today
                    });
                };
            });

            // to implement: document.querySelector('div.description__text.description__text--rich').innerText

            // Just waiting again
            await tools.delay(5000);
        };

        // Save response
        fs.writeFileSync(`${config.DOWNLOAD_PATH}\\response.json`, JSON.stringify(jobs), function (err) {
            if (err) throw err;
        });
        
        // Finally close browser
        await browser.close();
        
    } catch (err) {
        console.error(err);

        // If something goes wrong, close browser
        if (browser) {
            await browser.close();
        }
    }

})();