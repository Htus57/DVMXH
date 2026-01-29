const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemId');

document.getElementById('content').innerText = `Details for item ${itemId}`;