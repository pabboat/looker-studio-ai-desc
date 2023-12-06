// function createMemory(messages) {
//     const memory = [];
//     for (const msg of messages) {
//         memory.push({ role: msg.role, content: msg.content });
//     }
//     return memory;
// }

// // send messages
// async function sendMessage() {
//     const inputElement = document.getElementById('user-input');
//     const userInput = inputElement.value.trim();

//     if (userInput !== '') {
//         showMessage("Guest", userInput);
//         chatMemory = await getChatGPTResponse(userInput, chatMemory);
//         inputElement.value = '';
//     }
// }

// // show messages in chat div
// function showMessage(sender, message) {
//     const chatContainer = document.getElementById('chat-container');
//     const chatSection = document.querySelector('.chathistory');
//     const typingIndicator = document.getElementById('typing-indicator');

//     // Remove "typing..." on answer arrival
//     if (typingIndicator && sender === 'GPT') {
//         chatContainer.removeChild(typingIndicator);
//     }

//     // create new message
//     const messageElement = document.createElement('div');
//     messageElement.innerText = `${sender}: ${message}`;

//     // ads a class according to the sender
//     if (sender === 'Guest') {
//         messageElement.classList.add('user-message');
//     } else if (sender === 'GPT') {
//         messageElement.classList.add('chatgpt-message');

//         // message copy
//         const copyLink = document.createElement('button');
//         copyLink.innerText = 'Copy';
//         copyLink.style.float = 'right';
//         copyLink.addEventListener('click', function (event) {
//             event.preventDefault();
//             const text = message;
//             const input = document.createElement('input');
//             input.value = text;
//             document.body.appendChild(input);
//             input.select();
//             document.execCommand('copy');
//             document.body.removeChild(input);
//         });

//         messageElement.appendChild(copyLink);
        
//     }

//     chatContainer.appendChild(messageElement);
//     chatSection.scrollTop = chatSection.scrollHeight;
// }

// fetches the answer
async function getChatGPTResponse(userInput, auth, chatMemory = []) {

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    ...chatMemory,
                    {"role": "user", "content": userInput}
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Error in the request to\'API');
        }

        const data = await response.json();

        if (!data.choices || !data.choices.length || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error('Invalid API request');
        }

        const chatGPTResponse = data.choices[0].message.content.trim();
        var cleanResponse = chatGPTResponse.replace(/(```html|```css|```javascript|```php|```python)(.*?)/gs, '$2');
        cleanResponse = cleanResponse.replace(/```/g, "");

        // pushes the answer into context memory array
        chatMemory.push({ role: 'user', content: userInput });
        chatMemory.push({ role: 'assistant', content: cleanResponse });

        // returns updated context memory array
        console.log(cleanResponse);
    } catch (error) {
        console.error(error);
        // .
    }
}

getChatGPTResponse("How are you doing?", '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')