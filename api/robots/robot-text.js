const algo = require("algorithmia");
const keyApi = require("../credentials/keys").apiKey;

async function robotText(content){
    //breakCOntenteIntoSentences(content);
    
    async function fetchContentFromWikipedia(content){
        const algoAuthentic = await algo(keyApi);
        const wikipediaAlgo = await algoAuthentic.algo("web/WikipediaParser/0.1.2?timeout=300");
        const wikipediaResponse = await wikipediaAlgo.pipe({
            "articleName": content.searchTerm,
            "lang":"pt"
        });
        const wikipediaContent = await wikipediaResponse.get();
        content.title = wikipediaContent.title;
        content.summary = wikipediaContent.summary;
        content.sourceOriginal = wikipediaContent.content; 
        content.images = wikipediaContent.images
        content.contentFinal = content.sourceOriginal.split("\n");
       
        content.contentFinal = {
            text: content.contentFinal.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith("=")) {
                    return false;
                } else {

                    return true;
                }
            })
        }
       

        
        return content;
    }
    
    content = await fetchContentFromWikipedia(content);
    return content;
}



module.exports = robotText;