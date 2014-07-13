window.onload = function(event){

  // declarations
  var playerX = { 
    className: "player-x",
    text: "X",
  };
  var playerO = {
    className: "player-o",
    text: "O"
  };

  var player = playerX;
  var taken = "taken";
  var turnCounter = 0;
  // var aiMode = true;

  winConditions = [
    ["one", "two", "three"],
    ["four", "five", "six"],
    ["seven", "eight", "nine"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["three", "six", "nine"],
    ["one", "five", "nine"],
    ["seven", "five", "three"]
  ];

  lockGame = false;

  var resetButton = document.getElementById("reset");

  // let player know who's turn it is
  var whosTurn = function() {
    element = document.getElementById("turn");
    element.innerHTML = "It is Player " + player.text + "'s turn.";
  };

  whosTurn();

  // toggle player
  var togglePlayer = function() {
    if (player === playerX) {
      player = playerO;
    }
    else {
      player = playerX;
    }
  }

  // click listener
  var setClickOnBox = function(id) {
    var box = document.getElementById(id);
    console.log(box);
    box.onclick = function() {
      if (lockGame) {
        return;
      }
      // check for box already clicked
      var classList = box.className.split(" ");
      for (var i = 0; i < classList.length; i++) {
        if (classList[i] === taken) {
          return;
        }
      };

      // set up clicked box
      box.classList.add(player.className);
      box.innerHTML = player.text;
      box.classList.add(taken);
      turnCounter++;

      // check if a player has won
      if (turnCounter >= 4) {
        if (checkForWin()){
          return;
        }
      }

      // check for draw
      if (turnCounter === 9) {
        alert("The game is a draw!");
        lockGame = true;
      };

      togglePlayer();
      whosTurn();
    };
  };

  // is there a better way to check for this without so many nested loops?
  var checkForWin = function() {
    classList = document.getElementsByClassName(player.className);
    for (var i = 0; i < winConditions.length; i++) {
      for (var j = 0, counter = 0; j < winConditions[i].length; j++) {
        for (var k = 0; k < classList.length; k++) {
          console.log(classList);
          if (classList[k].id === winConditions[i][j]) {
            counter++;
            if (counter === 3) {
              alert("Player " + player.text + " has won!");
              lockGame = true;
              return true;
            }
          }
        };
      };
    };
  };

  // reset the game
  resetButton.onclick = function(event) {
    var boxes = document.getElementsByClassName("square");
    console.log(boxes);
    console.log(boxes[0]);
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
      boxes[i].classList.remove(playerX.className);
      boxes[i].classList.remove(playerO.className);
      boxes[i].classList.remove(taken);
      turnCounter = 0;
      lockGame = false;
      player = playerX;
      whosTurn();
    };
  };

  // initialize listeners
  setClickOnBox("one");
  setClickOnBox("two");
  setClickOnBox("three");
  setClickOnBox("four");
  setClickOnBox("five");
  setClickOnBox("six");
  setClickOnBox("seven");
  setClickOnBox("eight");
  setClickOnBox("nine");
};