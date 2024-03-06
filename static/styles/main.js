const user_input = document.getElementById('user-input');
const send_button = document.getElementById('send-button');
const user_messages = document.getElementsByClassName('user-message');
const chatmessage = document.querySelector('.chat-message');

send_button.addEventListener('click', () => {
    const message = user_input.value;
    const message_div = document.createElement('div');
    message_div.innerHTML = "<p>" + message + "</p>";
    message_div.classList.add('user-message');
    document.getElementById('chat-box').appendChild(message_div);
    user_input.value = '';
    // Send data to Flask route using Axios
    axios.post('/submit', {
        chat_message:message
    })
    .then(function (response) {
        console.log(response.data);

        const message_div = document.createElement('div');
        message_div.innerHTML = "<p>" + response.data + "</p>";
        message_div.classList.add('bot-message');
        document.getElementById('chat-box').appendChild(message_div);
        chatmessage.scrollTop = chatmessage.scrollHeight;
        // Handle response from Flask backend if needed
    })
    .catch(function (error) {
        console.error(error);
        // Handle errors if any
    });
    chatmessage.scrollTop = chatmessage.scrollHeight;
});
// Enter key event
user_input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        send_button.click();
    }
});
