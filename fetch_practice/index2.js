document.addEventListener('DOMContentLoaded', () => {
    function fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(resp => resp.json())
            .then(data => renderQuotes(data))
    }
    function renderQuotes(data) {

        for (const q of data) {
            //Find the container where we attach everything to 
            const quoteUL = document.querySelector('#quote-list');
            const form = document.querySelector('#new-quote-form');
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
            blockQuote.className = 'blockquote';   //for styling
            para.className = 'mb-1';                      //for styling
            quoteLi.className = 'quote-card';

            footer.className = 'blockquote-footer';    //for styling
            quoteLi.dataset.id = q.id   //Grab data and insert it into created elements  

            id.innerHTML = q.id;
            para.innerHTML = q.body;
            footer.innerHTML = q.title;    //Append everything to main container

            //attach dislike button to body quote

            blockQuote.append(id, para, footer, dislikesBtn, br, hr);
            quoteLi.append(blockQuote);
            quoteUL.append(quoteLi);

            //attach necessary attributes to delete button
            dislikesBtn.textContent = 'Delete';
            dislikesBtn.className = 'btn-danger'
            dislikesBtn.addEventListener('click', () => deleteQuote())

            /*1. Run fetch function with the appropriate url and required object argument when running a delete fetch request. This will delete on backend.
            2. After running delete fetch request, simply delete quote node on frontend.*/

            // form.addEventListener('submit', (e) => postQuote(e))


            function deleteQuote() {
                const url = `https://jsonplaceholder.typicode.com/posts/${q.id}`
                const reqObject = {
                    method: 'DELETE'
                };
                fetch(url, reqObject)
                .then(quoteLi.remove());
                //note. Running a delete fetch request is different from a get request.
             console.log(url )
            } 
        }
    }//Call the function that will automatically run renderQuote() also
    fetchData();
})