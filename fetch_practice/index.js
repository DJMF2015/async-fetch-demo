document.addEventListener('DOMContentLoaded', () => {
    function fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            //  fetch('http://api.icndb.com/jokes/random/')
            .then(resp => resp.json())
            .then(data => renderQuotes(data))
    }

    function renderQuotes(data) {
        // for (const q in data) {
        data.forEach((q) => {
            console.log(q);
            //Find the container where we attach everything to      
            const quoteUL = document.querySelector('#quote-list');
            //Create all necessary elements     
            const quoteLi = document.createElement('li');
            const blockQuote = document.createElement('blockquote');
            blockQuote.className = 'blockquote'; //for styling 
            const hr = document.createElement('hr');
            const id = document.createElement('p');
            const para = document.createElement('p');
            const footer = document.createElement('footer');
            footer.className = 'blockquote-footer'; //for styling

            quoteLi.dataset.id = q.id;
            id.innerHTML = q.id;
            para.innerHTML = q.title;
            footer.innerHTML = q.body;
            blockQuote.append(id, para, footer, hr);
            quoteLi.append(blockQuote);
            quoteUL.append(quoteLi);
            //  }
        });
    }
    //Call the function to automatically run renderQuote()  
    fetchData();
})
