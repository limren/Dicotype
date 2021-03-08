// Get words from words_list

let btnStart = document.querySelector(".start");
let btnStop = document.querySelector(".stop");
let time = 0;
let timer;
let anotherTimer;

fetch("../../assets/json/words_list.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Declare variables
    const wordInput = document.getElementById("input-word");
    let word = document.getElementById("word");
    let i = 0;
    let words = data.words;
    let score = document.getElementById("score");
    let actualScore = 0;
    let time = 0;

    score.innerText = `Vous avez tapé ${actualScore} mot.`;
    word.innerText = words[i];

    // For each "input" entered, we'll check if the value of wordTyped is equal to word.innerText
    wordInput.addEventListener("input", () => {
      let wordTyped = wordInput.value;

      if (wordTyped == word.innerText) {
        i++;
        word.innerText = words[i];
        wordInput.value = "";
        actualScore++;
      }
    });
    btnStart.addEventListener("click", () => {
      wordInput.removeAttribute("disabled");
      btnStart.innerText = "Reprendre.";
      timer = setInterval(() => {
        time++;
      }, 1000);
      anotherTimer = setInterval(() => {
        score.innerText = `Vous avez tapé ${actualScore} mots en ${time} secondes.`;
      }, 1);
      btnStart.disabled = true;
    });
    btnStop.addEventListener("click", () => {
      wordInput.setAttribute("disabled", "");
      clearInterval(timer);
      clearInterval(anotherTimer);
      btnStart.disabled = false;
    });
  });
