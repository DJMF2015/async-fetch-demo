window.addEventListener('DOMContentLoaded', () => {

    var url = `https://jsonplaceholder.typicode.com/posts/`

    const form = document.querySelector('#new-quote-form');
    form.addEventListener('submit', (evt) => createNewQuote(evt));


    document.getElementById('new-quote-form').addEventListener('submit', saveQuote);


    function fetchData() {

        fetch(url)
            .then(response => response.json())
            .then(data => renderQuotes(data))
        getData();
    }


    function getData() {
        var quotes = JSON.parse(localStorage.getItem('quote'));
        renderQuotes(quotes)
    }

    function renderQuotes(data) {
        for (const q of data) {
            //Find the container where we attach everything to 

            const quoteUL = document.querySelector('#quote-list');

            //Create all necessary elements
            const quoteLi = document.createElement('li');
            const blockQuote = document.createElement('blockquote');
            const id = document.createElement('p');
            const para = document.createElement('p');
            const footer = document.createElement('footer');
            const br = document.createElement('br');
            const hr = document.createElement('hr') //Add appropriate classes and ids. Grab data and insert if needed.

            //create 'dislike' button
            const dislikesBtn = document.createElement('button');
            // const updatebutton = document.createElement('button');
            quoteLi.className = 'quote-card';
            blockQuote.className = 'blockquote';
            para.className = 'mb-1';
            quoteLi.className = 'quote-card';
            footer.className = 'blockquote-footer';
            quoteLi.dataset.id = q.id   //Grab data and insert it into created elements  
            id.innerHTML = q.id;

            para.innerHTML = q.body;
            footer.innerHTML = q.title;
            para.setAttribute('contenteditable', true);
            //Append everything to main container
            //attach dislike button to body quote
            blockQuote.append(id, para, footer, dislikesBtn, br, hr);
            quoteLi.append(blockQuote);
            quoteUL.append(quoteLi);

            //attach necessary attributes to delete button
            dislikesBtn.textContent = 'Delete';
            dislikesBtn.className = 'btn-danger'
            dislikesBtn.addEventListener('click', () => deleteQuote())

            // updatebutton.textContent = 'Update';
            // updatebutton.className = 'btn-success'
            // updatebutton.addEventListener('click', (evt) => updateQuote(evt)); 
            function deleteQuote() {

                const reqObject = {
                    method: 'DELETE'
                };
                fetch(url + `${q.id}`, reqObject)
                    .then(quoteLi.remove());
                localStorage.clear();
                //running a delete fetch request is different from a get request.
                console.log(url.concat(`${q.id}`))
                localStorage.clear();
            }

            function updateQuote(evt) {
                var quotation = []
                evt.preventDefault();
                const newQuote = document.querySelector('#new-quote').value;
                const newAuthor = document.querySelector('#author').value;
                // edit values from input fields using edit form id
                // -----------------TO DO--------------
                const updateObject = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: newQuote,
                        body: newAuthor
                    })
                };
                fetch(url + `${q.id}`, updateObject)
                    .then(resp => resp.json())
                    .then(posts => renderQuotes([posts]))
                    .catch(err => console.error(err));
                //running a delete fetch request is different from a get request.
                var quotation = JSON.parse(localStorage.getItem('quote'));
                quotation.push(updateObject);
                localStorage.setItem('quote', JSON.stringify(quotation));
                console.log(url.concat(`${q.id}` + updateObject))

            }
        }
    }

    //form variable for holding data to post

    function createNewQuote(evt) {
        evt.preventDefault();

        const newQuote = document.querySelector('#new-quote').value;
        const newAuthor = document.querySelector('#author').value;
        // console.log(newAuthor)
        const reqObject = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newQuote,
                body: newAuthor
            })
        }
        return fetch('https://jsonplaceholder.typicode.com/posts', reqObject)
            .then(resp => resp.json())
            .then(posts => renderQuotes([posts]))
            .catch(err => console.error(err));
    }
    function saveQuote(evt) {
        var id = 101;

        const newQuote = document.querySelector('#new-quote').value;
        const newAuthor = document.querySelector('#author').value;
        // console.log(newAuthor)

        var quotes = {
            id: id++,
            title: newQuote,
            body: newAuthor

        }
        if (localStorage.getItem('quote') === null) {
            var quotation = []
            quotation.push(quotes);
            localStorage.setItem('quote', JSON.stringify(quotation));
        } else {
            var quotation = JSON.parse(localStorage.getItem('quote'));
            quotation.push(quotes);
            localStorage.setItem('quote', JSON.stringify(quotation));
        }
        document.getElementById('new-quote-form').reset();

        renderQuotes(quotation);

        evt.preventDefault();
    }
    //Call the function that will automatically run renderQuote() also

    fetchData();
})