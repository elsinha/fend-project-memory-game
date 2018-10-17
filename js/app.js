/*
 * Create a list that holds all of your cards
 */
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
Some suggestions for the cards to consider: let symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]; // save all the initial symbols into one array.
let cards = [...symbols, ...symbols]; // this is the spread syntax. it will take the cards array and spread its values inside the openCards array two times.
The second one is using the native concat method:
let symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let cards = symbols.concat(symbols); // will have the same effect as the spread syntax.
*/

let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let timer = 0;
let rating = 3;
let moves = 0;
let intervalTimer = 0;
const threeStars = 20;
const twoStars = 30;
const oneStar = 40;
const cardsLi = document.getElementsByClassName("card");
let listOpenCards = [];
document.body.onload = displayCard();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCard() {
  listOpenCards = [];
  timer = 0;
  timeReset(intervalTimer);
  moves = 0;
  intervalTimer = 0;
  let movesDoc = document.getElementById("moves");
  movesDoc.innerHTML = moves;
  document.getElementById('timer').innerHTML = timer + " seconds";
  const shuffledArrayCards = shuffle(cards);
  console.log(shuffledArrayCards);
  const ulDeck = document.getElementById('deck');
  ulDeck.innerHTML = '';

  /*
  <li class="card">
      <i class="fa fa-diamond"></i>
  </li>
  */

  //later I would like to add for loop

  const ulRateStars = document.getElementById('stars')
  ulRateStars.innerHTML = '';
  const liStarsOne = document.createElement('li');
  const liStarsTwo = document.createElement('li');
  const liStarsThree = document.createElement('li');
  const iStarOne = document.createElement("i");
  const iStarTwo = document.createElement("i");
  const iStarThree = document.createElement("i");
  iStarOne.classList.add("fa", "fa-star");
  iStarTwo.classList.add("fa", "fa-star");
  iStarThree.classList.add("fa", "fa-star");
  liStarsOne.appendChild(iStarOne);
  liStarsTwo.appendChild(iStarTwo);
  liStarsThree.appendChild(iStarThree);
  ulRateStars.appendChild(liStarsOne);
  ulRateStars.appendChild(liStarsTwo);
  ulRateStars.appendChild(liStarsThree);


  shuffledArrayCards.forEach(cardStringCreated => {
    console.log(cardStringCreated);
    const liCreated = document.createElement('li');
    liCreated.classList.add("card");
    /*
        liCreated.classList.add("open");
          liCreated.classList.add("show");
    */
    const iCreated = document.createElement('i');
    iCreated.classList.add("fa");
    iCreated.classList.add(cardStringCreated);
    liCreated.appendChild(iCreated);
    ulDeck.appendChild(liCreated);


  })

  /*
  Can also use the forEach method on the cardsLi nodelist directly or create an array from this nodelist first using Array.from() method.
  Or use the newer ES6 array methods like map method to achieve the same results.
  */

  Array.prototype.forEach.call(cardsLi, function(el) {
    console.log(el.tagName);
    el.addEventListener("click", function(e) {
      if (!el.classList.contains("open", "show")) {
        moves++;
        let movesDoc = document.getElementById("moves");
        movesDoc.innerHTML = moves;
        if (moves == 1) {
          startTimer();
        }
        openCard(el);
        if (listOpenCards.length == 2) {
          if (moves >= threeStars && moves < twoStars) {
            drawTwoStars();
          } else if (moves >= twoStars && moves < oneStar) {
            drawOneStars();
          }

          // can use .map() method or .forEach to loop directly over the array.

          if (listOpenCards[0].querySelector(".fa").className ===
            listOpenCards[1].querySelector(".fa").className) {
            Array.prototype.forEach.call(listOpenCards, function(cardEl) {
              cardEl.classList.add("match");
            });
            listOpenCards = [];
            isMatchWin();
          } else {
            setTimeout(function() {
              Array.prototype.forEach.call(listOpenCards, function(cardEl) {
                cardEl.classList.remove("open", "show");
              });
              listOpenCards = [];
            }, 1000);
          }
        }
      }
    });
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





function isMatchWin() {
  const cardsLeft = document.getElementsByClassName("card");
  let containsCard = 0;

  Array.prototype.forEach.call(cardsLeft, function(cd) {
    if (!cd.classList.contains("match")) {
      containsCard++;
    }
  });
  if (containsCard == 0) {
    var resp = confirm("Congrats! You won with " + moves + " moves and in " + timer + " seconds! Do you want to play agian?");
    if (resp == true) {
      displayCard();
      startTimer();
    }
  }
}

// Alternatives to the native confirm method:
// Booststrap Modal ==> https://getbootstrap.com/docs/4.0/components/modal/
// Semantic UI Modal ==> https://semantic-ui.com/modules/modal.html
// Sweet Alert JS Library ==> https://sweetalert.js.org/guides/
// Basic HTML/CSS/JS Modal ==> https://www.w3schools.com/howto/howto_css_modals.asp



function openCard(element) {
  if (element.classList.contains("open", "show")) {
    element.classList.remove("open", "show");
  } else {
    element.classList.add("open", "show");
    listOpenCards.push(element);
  }
}
//Later I would like to create loop

function drawTwoStars() {
  const ulRateStars = document.getElementById('stars')
  ulRateStars.innerHTML = '';
  const liStarsOne = document.createElement('li');
  const liStarsTwo = document.createElement('li');
  const iStarOne = document.createElement("i");
  const iStarTwo = document.createElement("i");
  iStarOne.classList.add("fa", "fa-star");
  iStarTwo.classList.add("fa", "fa-star");
  liStarsOne.appendChild(iStarOne);
  liStarsTwo.appendChild(iStarTwo);
  ulRateStars.appendChild(liStarsOne);
  ulRateStars.appendChild(liStarsTwo);

}
//Later I would like to create loop

function drawOneStars() {
  const ulRateStars = document.getElementById('stars')
  ulRateStars.innerHTML = '';
  const liStarsOne = document.createElement('li');
  const iStarOne = document.createElement("i");
  iStarOne.classList.add("fa", "fa-star");
  liStarsOne.appendChild(iStarOne);
  ulRateStars.appendChild(liStarsOne);

}


function startTimer() {
  intervalTimer = setInterval(function() {
    document.getElementById('timer').innerHTML = timer + " seconds";
    timer = timer + 1;
  }, 1000);
}



function timeReset(timer) {
  if (timer) {
    clearInterval(timer);
  }
}
