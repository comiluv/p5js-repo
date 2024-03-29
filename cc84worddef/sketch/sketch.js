function setup()
{
    noCanvas();
    let bgpage = chrome.extension.getBackgroundPage();
    let { word } = bgpage;
    let url = `https://api.wordnik.com/v4/word.json/`
        + `${word}`
        + `/definitions?limit=1`
        + `&includeRelated=false`
        + `&sourceDictionaries=all`
        + `&useCanonical=false`
        + `&includeTags=false`
        + `&api_key=APIKEY`;

    url.replace(/\s+/g, '');

    loadJSON(url, gotData);

    function gotData(data)
    {
        createP(data[0].text);
    }

    createP(word);
}
