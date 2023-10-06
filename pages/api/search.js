import axios from 'axios';
import { has } from 'lodash';

export default async function handler(req, res) {
    const { query } = req.body;
    const searchUrl = 'https://jll-gb-azsearch-cws-prod.search.windows.net/indexes/us-en/docs/search?api-version=2019-05-06';
    const apiKey = "AF71C4BE66AAFC80D77D13F84F281D51";

    const data = {
        "count": true,
        "highlight": "title,content,description",
        "highlightPreTag": "<tag>",
        "highlightPostTag": "</tag>",
        "minimumCoverage": null,
        "scoringParameters": null,
        "scoringProfile": "Service Tiles",
        "search": query,
        "searchFields": "content,title,city,stateProvince,country,jobTitle",
        "queryType": "simple",
        "searchMode": "any",
        "top": 10,
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: searchUrl,
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        data: data
    };
    let answer = "no answer";
    let status = 500;

    await axios.request(config)
        .then(async (response) => {

            var mergedTexts = "";
            if (response.data.value) {

                console.log("articles - ");
                console.log("Hi");
                response.data.value.forEach(function (item) {
                    console.log(item.path);
                    let articlePath = item.path;
                    articlePath = articlePath.replace("/content/jll-dot-com/countries/amer/us/en", "https://www.us.jll.com/en");
                    console.log("Content type" + item.contentTypes);
                    if(item.contentTypes && item.contentTypes.includes('People') ){
                        let content = [];
                        content.push('Name:' + item.title);
                        content.push('city:' + item.city );
                        content.push('stateProvince:'+item.stateProvince);
                        content.push('jobTitle:'+item.jobTitle);
                        content.push('country:'+item.country);
                        mergedTexts = mergedTexts + "<peopleInfoStart>" +content.join(',')+ "<peopleInfoEnd>"
                        + "<pathStart>" + articlePath + "<pathEnd>"



                    }
                    else if(item.contentTypes && item.contentTypes.includes('News release')){

                        mergedTexts = mergedTexts + "<articleStart>" + item.content + "<articleEnd>"
                            + "<pathStart>" + articlePath + "<pathEnd>"


                    }

                });
                console.log(mergedTexts);


                var truncatedString = truncateString(mergedTexts, 3700);

                answer = await generateAnswer(query, mergedTexts);
                status = 200;
            }

        })
        .catch((error) => {
            console.log(error);
            answer = 'Failed to reach Azure Cognitive Search';
            status = 500;
        });

    res.status(status).json(answer);

}

function truncateString(string, maxLength) {
    string = string.trim();
    var tokens = string.split(/\s+/);

    if (tokens.length <= maxLength) {
        return string;
    }

    var truncatedString = tokens.slice(0, maxLength).join(' ');

    return truncatedString;
}




async function generateAnswer(question, context) {
    const completionEndPoint = 'https://salesforce-openai-playground.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview';
    const AIheaders = {
        'api-key': '11c293d759224b48b19e2bb069e61e10',
        'Content-Type': 'application/json'
    };
    const payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user", "content":
                    `Please find answer or details or relevant information
                    to respond in maximum 5 lines
                    from the given context for user's prompt.
                    Answer only from the context provided here.
                    If it is about a person, please include the profile details and
                    give importance to the profile details than other info
             Prompt: ${question} and Context: ${context}`
            }
        ]
        , "temperature": 0
    };


    let config = {
        method: 'post',
        url: completionEndPoint,
        headers: AIheaders,
        data: payload
    };

    var answer = "this is test ";
    await axios.request(config).then((response) => {
        answer = response.data.choices[0].message.content;

    }).catch((error) => {
        console.log(error);
        res.status(500).json('Failed to reach AI');
    });

    return answer;
}