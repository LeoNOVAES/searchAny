const express = require('express');
const app = express();

const robotText = {
    text:require("./robots/robot-text")
}

const robotImage = {
    image:require('./robots/robot-image')
}

const robotYoutube = {
    video: require('./robots/robot-youtube')
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const port  = 5000;

app.listen(port,()=>{
    console.log("Running on port: " + port);
})


app.get('/getText/:term/:lang',async (req,res) => {
    let content = {};
    content.searchTerm = req.params.term;
    content.lang = req.params.lang;
    content.cont = await robotText.text(content);
    let images = await robotImage.image(content.searchTerm);
    let video = await robotYoutube.video(content.searchTerm)
    res.status(200).json({
        title: content.cont.title,
        body: content.cont.contentFinal.text.join(''),
        images: images,
        video:video
    })
})

