const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://www.imdb.com/title/tt17632862/?ref_=ttls_li_tt";


//nameless async function that runs normally
(async () => {
        const response = await request({
                uri: URL,
                //spoofing headers so that the scraper looks like a normal user
                headers: {
                        'authority': 'api.graphql.imdb.com',
                        'method': 'OPTIONS',
                        'path': '/?operationName=TitleShowRatingPrompt&variables=%7B%22constId%22%3A%22tt17632862%22%2C%22locale%22%3A%22en-US%22%2C%22promptType%22%3A%22RATINGS_TITLE_MAIN%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22e03e2f8022e30a33eecae69812806f108cb81150165653de71c2c782996d8f52%22%2C%22version%22%3A1%7D%7D',
                        'scheme': 'https',
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Access-Control-Request-Headers': 'content-type,x-amzn-sessionid,x-imdb-client-name,x-imdb-client-rid,x-imdb-user-country,x-imdb-user-language,x-imdb-weblab-treatment-overrides',
                        'Access-Control-Request-Method': 'GET',
                        'Origin': 'https://www.imdb.com',
                        'Referer': 'https://www.imdb.com/',
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-site',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                gzip: true
        });

        
        let $ = cheerio.load(response);
        let title  = $('h1[data-testid="hero__pageTitle"] > span[class="hero__primary-text"]').text();
        let rating = $('div[data-testid="hero-rating-bar__aggregate-rating__score"] > span[class="sc-bde20123-1 cMEQkK"]').text();
        let poster =  $('div[class="ipc-media ipc-media--poster-27x40 ipc-image-media-ratio--poster-27x40 ipc-media--baseAlt ipc-media--poster-l ipc-poster__poster-image ipc-media__img"] > img').attr('src');
        let releaseDate = $('ul[class="ipc-inline-list ipc-inline-list--show-dividers sc-d8941411-2 cdJsTz baseAlt"] > li > a[href="/title/tt17632862/releaseinfo?ref_=tt_ov_rdat"]').text();

        let creators = [];
        $('div[class="ipc-metadata-list-item__content-container"] > ul[class="ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content baseAlt"] > li').each((i, elm) => {
                let creator = $(elm).text();

                creators.push(creator);
        });

        console.log("Title: "+ title);
        console.log("Rating: "+ rating);
        console.log("Poster: "+ poster);
        console.log("Release: "+ releaseDate);

        console.log(creators);

})()