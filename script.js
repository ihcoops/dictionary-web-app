const searchBar = document.getElementById('search-bar');
const searchButton = document.querySelector('.search-button');

searchBar.defaultValue = 'keyboard';

const word = document.querySelector('.word');
const phonetic = document.querySelector('.phonetic')

searchButton.addEventListener('click', () => {
  search(searchBar.value);
});

function search(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response data as JSON
      } else {
        throw new Error('API request failed');
      }
    })
    .then(data => {
      // Process the response data here
      display(data);
    })
    .catch(error => {
      // Handle any errors here
      console.error(error); // Example: Logging the error to the console
    });
}


//ADD SYN AND ANT CHECK FOR EACH DEFINITION

function display(data) {
  console.log(data);
  word.innerHTML = data["0"].word;
  phonetic.innerHTML = `<p class="phonetic">${data["0"].phonetic}</p>`;
  const meaningsContainer = document.querySelector('.meanings-container');
  let meaningsHTML = "";
  data.forEach((piece) => {
    const meanings = piece.meanings;
    meanings.forEach((meaning) => {
      meaningsHTML += `<h3>${meaning.partOfSpeech}</h3>`;
      meaningsHTML += "<h4>meaning</h4>";
      const definitions = meaning.definitions;
      meaningsHTML += "<ul>"
      definitions.forEach((definition) => {
        meaningsHTML += `<li>${definition.definition}</li>`;
        if(definition.example) {
          meaningsHTML += `<p>${definition.example}</p>`;
        }
      })
      meaningsHTML += "</ul>"
      if(meaning.synonyms.length > 0) {
        meaningsHTML += "<p>Synonyms: ";
        meaning.synonyms.forEach((synonym) => {
          meaningsHTML += synonym+", ";
        })
        meaningsHTML += "</p>";
      }
      if(meaning.antonyms.length > 0) {
        meaningsHTML += "<p>Antonyms: ";
        meaning.antonyms.forEach((antonym) => {
          meaningsHTML += antonym+", ";
        })
        meaningsHTML += "</p>";
      }
    })
  })
  meaningsContainer.innerHTML = meaningsHTML;
}