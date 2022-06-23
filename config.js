module.exports = {
    PUPPETEER_OPTIONS : {
        "product": "chrome",
        "defaultViewport": null,
        "headless": false,
        "executablePath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "userDataDir": "C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data",
        "args": [
            "--profile-directory=Default", // Check out chrome://version/
            "--enable-features=NetworkService"
        ],
        "ignoreHTTPSErrors": true
    },
    DOWNLOAD_PATH : `${process.cwd()}\\downloads`
};