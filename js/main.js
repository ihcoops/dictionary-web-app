const searchBar = document.getElementById('search-bar');

searchBar.defaultValue = 'hello';

const word = document.querySelector('.word');
const phonetic = document.querySelector('.phonetic');

const errorTitle = document.querySelector('.error-title');
const errorBody = document.querySelector('.error-body');
const meaningsContainer = document.querySelector('.meanings-container');

search("hello");

function handleKey(event) {
  if(event.key === 'Enter') {
    search(searchBar.value);
  }
}
function search(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response data as JSON
      } else {
        displayError();
        throw new Error('API request failed');
      }
    })
    .then(data => {
      // Process the response data here
      display(data);
    })
    .catch(error => {
      // Handle any errors here
      console.error(error);
    });
}

function displayError() {

  console.log("HELLO");

  word.innerHTML = "";
  phonetic.innerHTML = "";
  meaningsContainer.innerHTML = "";
  
  errorTitle.innerHTML = "No Definitions Found";
  errorBody.innerHTML = "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.";
  
}

let meaningsHTML = "";
function display(data) {
  errorTitle.innerHTML = "";
  errorBody.innerHTML = "";
  meaningsHTML = "";
  console.log(data);
  word.innerHTML = data["0"].word;
  if (data["0"].phonetic) {
    phonetic.innerHTML = `${data["0"].phonetic}`;
  }
  else if(data["0"].phonetics){
    const phonetics = data["0"].phonetics;
    for(let phoneticPiece of phonetics) {
      if(phoneticPiece.text) {
        phonetic.innerHTML = phoneticPiece.text;
        break;
      }
    }
  }
  

  data.forEach((piece) => {
    const meanings = piece.meanings;
    meanings.forEach((meaning) => {
      meaningsHTML += `<div class="part-of-speech"><h3>${meaning.partOfSpeech}</h3><div class="divider"></div></div>`;
      meaningsHTML += "<h4>Meaning</h4>";
      const definitions = meaning.definitions;
      meaningsHTML += "<ul>"
      definitions.forEach((definition) => {
        meaningsHTML += `<li>${definition.definition}</li>`;
        if (definition.example) {
          meaningsHTML += `<p class = "gray">"${definition.example}"</p>`;
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
  if (synonyms.length > 0) {
    meaningsHTML += `<h4 class = "gray">Synonyms&emsp;<span class="synonyms">`;
    let i = 0;
    synonyms.forEach((synonym) => {
      meaningsHTML += synonym;
      if(i != synonyms.length -1) {
        meaningsHTML += ", "
      }
      i++;
    })
    meaningsHTML += "</span></h4>";
  }
  if (antonyms.length > 0) {
    meaningsHTML += `<h4 class = "gray">Antonyms&emsp;<span class="synonyms">`;
    let i = 0;
    antonyms.forEach((antonym) => {
      meaningsHTML += antonym;
      if(i != antonyms.length -1) {
        meaningsHTML += ", "
      }
      i++;
    })
    meaningsHTML += "</span></h4>";
  }
}