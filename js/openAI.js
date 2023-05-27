
function generateImage() {
    var inputText = document.getElementById("myImageInput").value;

    const apiUrl = 'https://api.openai.com/v1/images/generations';
    const message = inputText;
    const requestBody = {
        prompt: message,
        n: 1,
        size: "1024x1024"
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Get the HTML element where you want to display the data
            const apiResponse = JSON.parse(JSON.stringify(data, null, 2));
            const imageURL = apiResponse.data[0].url;

            // Get the image element
            const img = document.getElementById('generatedImage');
            // Set the image source
            img.src = imageURL;

        })
        .catch(error => console.error(error));

}

function askGPT() {
    var inputText = document.getElementById("myInput").value;

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const message = inputText;
    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": message }],
        temperature: 0.7,
        max_tokens: 50,
        stop: "\n",
        frequency_penalty: 0,
        presence_penalty: 0
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            const apiResponse = JSON.parse(JSON.stringify(data, null, 2));
            const agentMessage = apiResponse.choices[0].message.content;

            // Get the HTML element where you want to display the data
            const element = document.getElementById('api-response');

            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.innerText = agentMessage;
            ul.append(li);

            element.appendChild(ul);
        })
        .catch(error => console.error(error));

}
