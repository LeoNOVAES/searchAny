const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const credentials = require('../credentials/keys.json')

async function getYoutube(arg) {
     const response = await customSearch.cse.list({
         auth: credentials.apiSearch,
         cx: credentials.apiEngine,
         q: arg,
         exactTerms: 'www.youtube.com/watch?v=',
         num: 1
     })

     const termYoutube = response.data.items.map((item) => {
         return item.link;
     })

     console.log(termYoutube)
     return termYoutube;
 }

 module.exports = getYoutube;