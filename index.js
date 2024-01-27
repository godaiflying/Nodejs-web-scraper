const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://www.imdb.com/title/tt17632862/?ref_=ttls_li_tt";


//nameless async function that runs normally
(async () => {
        const response = await request(URL);
        console.log(response);
})()