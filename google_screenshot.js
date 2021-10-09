var webshot = require('webshot-node');
var express = require('express')
var app = express();

app.listen(process.env.PORT || 3000, console.log('http://localhost:3000'));

app.get('/:query', async (req,res) => {
    webshot(`https://www.google.com/search?q=${req.params.query}`, 'google.png', function(err) {
        res.sendFile(__dirname+'/google.png');
    });
})

app.get('/', (req,res) => {
    res.send('usage => /{query}');
})
