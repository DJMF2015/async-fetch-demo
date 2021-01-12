document.addEventListener('DOMContentLoaded', () => {
    let url = `https://jsonplaceholder.typicode.com/posts/`
    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(data => renderQuotes(data))
    }

    function renderQuotes(data) {

        for (const q of data) {
            //Find the container where we attach everything to 
            const quoteUL = document.querySelector('#quote-list');
            //form variable for holding data to post
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

            quoteLi.className = 'quote-card'; //for styling
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
            form.addEventListener('submit', (e) => createNewQuote(e));

            function deleteQuote() {
                const reqObject = {
                    method: 'DELETE'
                };
                fetch(url + `${q.id}`, reqObject)
                    .then(quoteLi.remove());
                //note. Running a delete fetch request is different from a get request.
                console.log(url.concat(`${q.id}`))
            }


            function createNewQuote(e) {
                e.preventDefault();
                const newPost = [];

                const newQuote = document.querySelector('#new-quote').value;
                const newAuthor = document.querySelector('#author').value;


                //send to backend api

                // url = `https://jsonplaceholder.typicode.com/posts` ;

                const reqObject = {
                    method: 'POST',
                    headers:  { 'Content-Type': 'application/json' } ,
                    body: JSON.stringify({
                        title: newQuote,
                        body: newAuthor
                    })
                }
                // newPost.push(reqObject)

                return fetch('https://jsonplaceholder.typicode.com/posts', reqObject)
                    .then(resp => resp.json())
                    .then(posts => renderQuotes([posts]))
                    // .then(posts => console.log(posts))
                    .catch(err => console.error(err));


                // fetchData(url, reqObject)
                //     .then(resp => resp.json())
                //     .then(quote => renderQuotes([quote]))
            }
        }
    }//Call the function that will automatically run renderQuote() also
    fetchData();
})

// const newPost = {
//   title: 'New Post Title',
//   body: 'Awesome post paragraph',
//   userId: 1
// }
// const newPost2 = {}

// const createNewPost = post => {
//   const options = {
//     method: 'POST',
//     body: JSON.stringify(post),
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     })
//   }
//   return fetch('https://jsonplaceholder.typicode.com/posts', options)
//     .then(res => res.json())
//     .then(posts => console.log(posts))
//     .catch(err => console.error(err));
// }
// createNewPost(newPost ); 
// createNewPost(newPost2);