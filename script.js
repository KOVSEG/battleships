// Battleship, 4 deck's (4 cell's) - 1 unit;
// Cruiser, 3 deck's (3 cell's) - 2 unit's;
// Destroyer, 2 deck's (2 cell's) - 3 unit's;
// Combat ship, 1 deck (1 cell) - 4 unit's;


let model = {
  battleFieldLength: 10,
  ships: [
    {deck: 4, localisation: [], hits: ['', '', '', '',] },
    {deck: 3, localisation: [], hits: ['', '', '',] },
    {deck: 3, localisation: [], hits: ['', '', '',] },
    {deck: 3, localisation: [], hits: ['', '']},
    {deck: 2, localisation: [], hits: ['', '']},
    {deck: 2, localisation: [], hits: ['', '']},
    {deck: 1, localisation: [], hits: ['']},
    {deck: 1, localisation: [], hits: ['']},
    {deck: 1, localisation: [], hits: ['']},
    {deck: 1, localisation: [], hits: ['']}
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
    let location;
    for(let ship of this.ships) {

      do {
        location = this.getLocations(ship);
      } while(this.collision(location))

      ship.localisation = location;
    }
  },

  getLocations: function (ship) {
    let shipLength = ship.deck;
    let direction = Math.floor(Math.random() * 2);
    let concatCoordinates;
    let getX = Math.floor(Math.random() * 10);
    let getY = Math.floor(Math.random() * (11 - 1) + 1);
    let coordinate = [];

    if(getX > (this.battleFieldLength - shipLength)) {
      getX = getX - shipLength;
    }
    if(getY > (this.battleFieldLength - shipLength)) {
      getY = getY - shipLength;
    }
    if(getY == 0) {
      getY = getY + 1;
    }

    for(let i = 0; i < shipLength; i++) { 
      if(direction === 1) {
        concatCoordinates = String(getX) + String(getY);
        getX = getX + 1;
        coordinate[i] = concatCoordinates;
      } else {
        concatCoordinates = String(getX) + String(getY);
        getY = getY + 1;
        coordinate[i] = concatCoordinates;
      }
    }
    return coordinate;
  },

  collision: function(location) {
    for(let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      for(let k = 0; k < location.length; k++) {
        if(ship.localisation.includes(location[k])) {
          return true;
        }
      }
    }
    return false;
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
  console.log(model.ships);
};