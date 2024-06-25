function message() {
    const textbox = document.getElementById('message-box');
    fetch('/post/message', {
        method: 'POST',
        body: JSON.stringify({
            message: textbox.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    textbox.value = '';
}

function setUsername() {
    const textbox = document.getElementById('name');
    document.cookie = `username=${textbox.value}`;
    fetch('/post/setusername', {
        method: 'POST',
        body: JSON.stringify({
            name: textbox.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    window.location = 'messages';
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function getMessages() {
    const response = await fetch('json/messages');
    console.log('response');
    console.log(response);
    const jsondata = await response.json();
    console.log('jsondata');
    console.log(jsondata);
    return jsondata;
}