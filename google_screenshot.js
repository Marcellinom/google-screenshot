var express = require('express')
var puppeteer = require('puppeteer');
const rUA = require('random-useragent');
var app = express();

app.listen(process.env.PORT || 3000, console.log('http://localhost:3000'));

app.get('/:query', async (req,res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent(rUA.getRandom() ||'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')

    await page.goto(`https://www.google.com/search?q=${req.params.query}`);
    await page.screenshot({
        path:"./google.png"
    });
    await page.close();
    await browser.close()
    res.sendFile(__dirname+'/google.png');
})

app.get('/', (req,res) => {
    res.send('usage => /{query}');
})
