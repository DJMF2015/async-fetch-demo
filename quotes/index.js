// Get the class from the DOM and add a event listener that listens to click, which starts the getJokes function
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    //We need a number of jokes so we create a new variable, we select it from the DOM, we could only use input as there is only one input, but to be more specific (in case there are more inputs) we also say type=number, and we want the value from the input:
    const number = document.querySelector('input[type="number"]').value;

    // So now we have our number, we can proceed with our xhr request
    const xhr = new XMLHttpRequest();

    // This time we want to get the API so we paste in the URL, but we want to hard code the number of jokes ourself, so we use the backtic and replace the number on the end with the dynamic number that is passed in, we also set it to true because we want it asynchronously
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    // So what we want to do when we get this data, goes into the onload:
    xhr.onload = function() {
        if(this.status === 200) {
            // If we want to loop true it we first have to parse it to an object with JSON.parse
            const response = JSON.parse(this.responseText);

            // So if we want to return it in the DOM we need to make a variable
            let output = '';

            //We also want to make sure the type is succes else we want a error message:
            if(response.type === 'success') {
                // Loop true it, we not just want to loop true the response, but just true the value, so we say (Depends on the API, some have the value in the response):
                response.value.forEach(function(joke){
                    //then we want to output the joke from the API
                    output += `<li>${joke.joke}</li>`;
                });
            } else {
                //We want to append to the output:
                output += '<li>Something went wrong</li>';
            }

            document.querySelector('.jokes').innerHTML = output;
        }
    }

    xhr.send();

    // Because it is a form, we use preventDefault
    e.preventDefault();
}