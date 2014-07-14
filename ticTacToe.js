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
  var lockGame = false;
  
  // ai stuff
  var aiMode = false;


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

  var resetButton = document.getElementById("reset");
  var aiButton = document.getElementById("ai");

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
  };

  // AI box picker
  var aiPicker = function() {
    freeArr = [];
    var boxes = document.getElementsByClassName("square");
    console.log(boxes);
    for (var i = boxes.length - 1; i >= 0; i--) {
      classList = boxes[i].className.split(" ");
      for (var j = 0; j < classList.length; j++) {
        if (classList[j] !== taken && j === classList.length - 1) {
            freeArr.push(boxes[i]);
        }
      };
    };
    randomBox = freeArr[Math.floor(Math.random()*freeArr.length)];
    console.log(randomBox);
    markBox(randomBox);
  };

  // click event handler
  var setClickOnBox = function(id) {
    var box = document.getElementById(id);
    console.log(box);
    box.onclick = function() {
      console.log("button clicked!");
      if (lockGame || (aiMode && player === playerO)) {
        console.log("Early return");
        return;
      }

      if (!aiMode || aiMode && player === playerX) {
        // check for box already clicked
        var classList = box.className.split(" ");
        for (var i = 0; i < classList.length; i++) {
          if (classList[i] === taken) {
            console.log("already taken");
            return;
          }
        };
        markBox(box);
      }

      // check for AI turn
      if (aiMode && player === playerO) {
        console.log("inside AI picker");
        window.setTimeout(aiPicker(), 1500);  
      }
    };
  };

  var markBox = function(box) {
    box.classList.add(player.className);
    box.innerHTML = player.text;
    box.classList.add(taken);
    turnCounter++;

    // check if a player has won
    if (turnCounter >= 4) {
      if (checkForWin()) {
        return;
      }
    }

    // check for draw
    if (turnCounter === 9) {
      alert("The game is a draw!");
      lockGame = true;
      return;
    };

    // switch player
    togglePlayer();
    whosTurn(); 
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

  // toggle AI Mode
  aiButton.onclick = function() {
    if (aiMode) {
      aiButton.innerHTML = "AI off!"
    }
    else {
      aiButton.innerHTML = "AI on!"
    }
    aiMode = !aiMode;
    resetNow();
  };

  // reset the game
  resetButton.onclick = function() {
    resetNow();
  };

  var resetNow = function() {
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
  // initialize event handlers
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