// Battleship, 4 deck's (4 cell's) - 1 unit;
// Cruiser, 3 deck's (3 cell's) - 2 unit's;
// Destroyer, 2 deck's (2 cell's) - 3 unit's;
// Combat ship, 1 deck (1 cell) - 4 unit's;
// 


let model = {
  battleFieldLength: 10,
  ships: [
    {localisation: ['', '', '', ''], hits: ['', '', '', '',] },
    {localisation: ['', '', ''], hits: ['', '', '',] },
    {localisation: ['', '', ''], hits: ['', '', '',] },
    {localisation: ['', ''], hits: ['', '']},
    {localisation: ['', ''], hits: ['', '']},
    {localisation: ['', ''], hits: ['', '']},
    {localisation: [''], hits: ['']},
    {localisation: [''], hits: ['']},
    {localisation: [''], hits: ['']},
    {localisation: [''], hits: ['']}
  ],

  fire: function (coordinates) {
    for(let ship of this.ships) {
      if(ship.localisation.includes(coordinates)) {
        if(ship.hits[ship.localisation.indexOf(coordinates)] == 'HIT') {
          alert('You have already shot here');
        } else {
          ship.hits[ship.localisation.indexOf(coordinates)] = 'HIT';
          this.checkSunk(ship);
        }
        view.hit(coordinates);
        return true;
      }
    }
    view.miss(coordinates);
    return false;
  },

  checkSunk: function(ship) {
    let score = 0;
    for(let i = 0; i < ship.hits.length; i++) {
      if(ship.hits[i] == 'HIT') {
        score++;
      }
    }

    if(ship.localisation.length === score) {
      alert('Ship is sunk!');
      controller.sunkedShips.push(score);
      return true;
    }
  },

  autoLocationShips: function() {
    let getDirection = Math.floor(Math.random() * 2);

    for(let ship of this.ships) {
      let shipLength = ship.localisation.length;
      let getCoordinateX = Math.floor(Math.random() * 10);
      let getCoordinateY = Math.floor(Math.random() * (11 - 1) + 1);

      if(getDirection) {
        //vertical direction
        if(getCoordinateX > (this.battleFieldLength - shipLength)) {
          getCoordinateX = getCoordinateX - shipLength;
        }
        for(let i = 0; i < shipLength; i++) {
          let concatCoordinates = String(getCoordinateX) + String(getCoordinateY);
          getCoordinateX = getCoordinateX + 1;
          ship.localisation[i] = concatCoordinates;
        }
      } else {
        //horizontal direction
        if(getCoordinateY == 0) {
          getCoordinateY = getCoordinateY + 1;
        }
        if(getCoordinateY > (this.battleFieldLength - shipLength)) {
          getCoordinateY = getCoordinateY - shipLength;
        }
        for(let i = 0; i < shipLength; i++) {
          let concatCoordinates = String(getCoordinateX) + String(getCoordinateY);
          getCoordinateY = getCoordinateY + 1;
          ship.localisation[i] = concatCoordinates;
        }
      }
    }
  }
};


let view = {
  miss: function(coordinates) {
    let showMiss = document.getElementById(coordinates);
    showMiss.classList.add('miss');
    showMiss.innerText = 'MISS';
  },
  hit: function(coordinates) {
    let showMiss = document.getElementById(coordinates);
    showMiss.classList.add('hit');
    showMiss.innerText = 'HIT';
  },
};


let controller = {
  sunkedShips: [],
  getCoords: function(param) {
    let coordSymb = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let getParam = '';

    if(param.length > 2) {
      getParam = coordSymb.indexOf(param[0]) + param[1] + param[2];
    } else {
      getParam = coordSymb.indexOf(param[0]) + param[1];
    }

    model.fire(getParam);
    if(getParam) {
      this.allShipsSunk();
    }
  },
  allShipsSunk: function() {
    if(this.sunkedShips.length === model.ships.length) {
      alert('Game over! All ships sank!');
    }
  }
};


function checkCoordinates() {
  let coordinates = document.getElementById('coordinates');
  let coordSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  let coordinatesValue = coordinates.value.toUpperCase();
  let firstCharCoords = coordinatesValue.charAt(0);

  if(!coordinatesValue.includes(' ')) {
    //Checking whitespace in the coordinates

    if(coordinatesValue.length < 1) {
      alert('Enter the coordinates');
    } else {

      let checkLetter = new RegExp('^[a-zA-Z]+$');
      if(checkLetter.test(coordinatesValue.charAt(0)) && coordSign.includes(firstCharCoords)) {
        //Checking the first coordinate, it must be a letter that match with array coordSign

        let checkSecondNum = new RegExp('^[1-9]+$');
        if(checkSecondNum.test(coordinatesValue.charAt(1))) {
          //Checking the second character, it must be a digit
          if(coordinatesValue.length === 2) {
            controller.getCoords(coordinatesValue);
          } else {

            if(coordinatesValue.length === 3) {
              let checkThirdNum = new RegExp('^[0]+$');
              if(checkSecondNum.test(coordinatesValue.charAt(1)) && checkLetter.test(coordinatesValue.charAt(2))) {
                alert('Don\'t write letters after the second coordinates, it will come to mistake');

              } else if(coordinatesValue.charAt(1) == 1 && checkThirdNum.test(coordinatesValue.charAt(2))) {
                //Checking the second and the third characters - both digits. The second character is equal the one, the third is equal to zero
                controller.getCoords(coordinatesValue);
              } else {
                alert('The maximum of digit\'s coordinate value at the battlefield is only 10');
              }
            } else {
              alert('You wrote too much characters, please write the coordinates correctly, for example: A5, b10, J9, c3. The register doesn\'t matter');
            }

          }
        } else {
          alert('The second coordinate must be equal with digits above the battlefield');
        }

      } else {
        alert('The first coordinate must be equal with values on the left side of the battlefield');
      }

    }
  } else {
    alert('Don\'t use whitespace in the coordinates');
  }

  coordinates.value = '';
  return null;

}; //checkCoordinates function


window.onload = init;

function init() {
  let startFire = document.getElementById('firebtn');
  startFire.addEventListener('click', checkCoordinates)

  model.autoLocationShips();
};