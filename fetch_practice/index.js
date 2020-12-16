document.addEventListener('DOMContentLoaded', () => {

    const url = 'http://api.icndb.com/jokes/random/';

    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(data => renderQuotes(data))
    }
    function renderQuotes(data) {
        for (const q in data) {

            //Find the container where we attach everything to      
            const quoteUL = document.querySelector('#quote-list');
            //Create all necessary elements     

            const footer = document.createElement('footer');
            const br = document.createElement('br');
            const hr = document.createElement('hr')

            footer.className = 'blockquote-footer';    //for styling

            //Grab data and insert it into created elements     
            //Append everything to main container 
            footer.innerHTML = data[q].joke
            // document.body.append (para,   header, footer, br, hr);
            document.body.appendChild(br, hr);
            quoteUL.append(footer);

        }
    }
    //Call the function that will automatically run renderQuote() also    
    fetchData();
})
