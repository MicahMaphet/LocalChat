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
    document.write(textbox.value);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}