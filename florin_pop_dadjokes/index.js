const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke)

const url = 'https://icanhazdadjoke.com';

generateJoke()

// USING ASYNC/AWAIT

// async function generateJoke() {
//     const config = {
//         headers: {
//             Accept: 'application/json',
//         },
//     }
//     //async await
//     const res = await fetch(url, config)

//     const data = await res.json()

//     jokeEl.innerHTML = data.joke
// }

// USING .then()

function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  fetch(url, config)
    .then((res) => res.json())
    .then((data) => {
      jokeEl.innerHTML = data.joke
    }) 
}