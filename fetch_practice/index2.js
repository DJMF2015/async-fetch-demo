document.addEventListener('DOMContentLoaded', () => {
    const url = `https://jsonplaceholder.typicode.com/posts/`

    const form = document.querySelector('#new-quote-form');
    form.addEventListener('submit', (evt) => createNewQuote(evt));
    // button.addEventListener('click', (evt) => updateQuote(evt));

    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(data => renderQuotes(data))
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

            quoteLi.className = 'quote-card'; 
            blockQuote.className = 'blockquote';
            para.className = 'mb-1';
            quoteLi.className = 'quote-card';
            footer.className = 'blockquote-footer';
            quoteLi.dataset.id = q.id   //Grab data and insert it into created elements  
            id.innerHTML = q.id;

            para.innerHTML = q.body;
            footer.innerHTML = q.title;

            //Append everything to main container
            //attach dislike button to body quote
            blockQuote.append(id, para, footer, dislikesBtn, br, hr);
            quoteLi.append(blockQuote);
            quoteUL.append(quoteLi);

            //attach necessary attributes to delete button
            dislikesBtn.textContent = 'Delete';
            dislikesBtn.className = 'btn-danger'
            dislikesBtn.addEventListener('click', () => deleteQuote())

            // 1. Run fetch function with the appropriate url and required object argument when running a delete fetch request. This will delete on backend.
            // 2. After running delete fetch request, simply delete quote node on frontend.
            //POST DATA: attach eventlistener to form to handle request

            function deleteQuote() {
                const reqObject = {
                    method: 'DELETE'
                };
                fetch(url + `${q.id}`, reqObject)
                    .then(quoteLi.remove());
                //running a delete fetch request is different from a get request.
                console.log(url.concat(`${q.id}`))

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

    //Call the function that will automatically run renderQuote() also
    function updateQuote(evt) {
        evt.preventDefault();
        // edit values from input fields using edit form id
        // -----------------TO DO--------------
        const updateObject = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body })
        };
        fetch(url + `${q.id}`, updateObject)
            .then(resp => resp.json())
            .then(posts => renderQuotes([posts]))
            .catch(err => console.error(err));
        //running a delete fetch request is different from a get request.
        console.log(url.concat(`${q.id}` + updateObject))

    }
    fetchData();
})
