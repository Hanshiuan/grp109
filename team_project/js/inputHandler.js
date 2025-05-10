// This function processes user input and updates the page with a message
function processInput() {
    // Get the value entered by the user in the input field
    const input = document.getElementById('userInput').value;

    // Update the output paragraph with a custom message
    document.getElementById('output').innerText = `Great choice! We love ${input}.`;
}

