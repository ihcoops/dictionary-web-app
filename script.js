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


let meaningsHTML = "";
function display(data) {
  meaningsHTML = "";
  console.log(data);
  word.innerHTML = data["0"].word;
  if(data["0"].phonetic) {
    phonetic.innerHTML = `<p class="phonetic">${data["0"].phonetic}</p>`;
  }
  const meaningsContainer = document.querySelector('.meanings-container');
  
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
        synAnt(definition.synonyms, definition.antonyms);
      })
      meaningsHTML += "</ul>"
      synAnt(meaning.synonyms, meaning.antonyms);
      
    })
  })
  meaningsContainer.innerHTML = meaningsHTML;
}

function synAnt(synonyms, antonyms) {
  if(synonyms.length > 0) {
    meaningsHTML += "<p>Synonyms: ";
    synonyms.forEach((synonym) => {
      meaningsHTML += synonym+", ";
    })
    meaningsHTML += "</p>";
  }
  if(antonyms.length > 0) {
    meaningsHTML += "<p>Antonyms: ";
    antonyms.forEach((antonym) => {
      meaningsHTML += antonym+", ";
    })
    meaningsHTML += "</p>";
  }
}