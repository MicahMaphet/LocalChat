/**
 * Takes in the key of the cookie and outputs the value
 * 
 * @param {*} name key of the cookie
 * @returns value of the cookie
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}