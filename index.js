function message() {
    fetch('/message', {
        method: 'POST',
        body: JSON.stringify({
            message: document.getElementById('message-box').value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    document.write(`message ${document.getElementById('message-box').value} sent`);
}