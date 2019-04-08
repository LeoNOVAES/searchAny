const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const credentials = require('../credentials/keys.json')

async function robotImage(serchTerm) {
    const arrayImages = await minerarImagesGoogle(serchTerm);
    console.dir(you, {depth:null});

    async function minerarImagesGoogle(arg){
        const response = await customSearch.cse.list({
            auth: credentials.apiSearch,
            cx: credentials.apiEngine,
            q: arg,
            searchType: 'image',
            num: 4
        })

        const images = response.data.items.map((item)=>{
            return item.link;
        })

        return images;
    }
 
    return arrayImages;
}

module.exports = robotImage