// Battleship, 4 deck's (4 cell's) - 1 unit;
// Cruiser, 3 deck's (3 cell's) - 2 unit's;
// Destroyer, 2 deck's (2 cell's) - 3 unit's;
// Combat ship, 1 deck (1 cell) - 4 unit's;
// 

let model = {
  ships: [
    { shipLength: 4, coordinates: [01, 02, 03, 04], hits: ['', '', '', ''] },
  ],
  fire: function (coordinates) {

  }
};

let view = {
  miss: function (coordinates) {
    let showMiss = document.getElementById(coordinates);
    showMiss.classList.add('miss');
    showMiss.innerText = 'MISS';
  },
  hit: function (coordinates) {
    let showMiss = document.getElementById(coordinates);
    showMiss.classList.add('hit');
    showMiss.innerText = 'HIT';
  },
};

let controller = {
  getCoords: function () {

  }
};

function checkCoordinates() {
  let coordinates = document.getElementById('coordinates');
  let coordSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  let coordinatesValue = coordinates.value;
  let firstCharCoords = coordinatesValue.charAt(0).toUpperCase();

  if(!coordinatesValue.includes(' ')) {
    //Checking whitespace in the coordinates

    if(coordinatesValue.length < 1) {
      console.log('Enter the coordinates');
    } else {

      let checkLetter = new RegExp('^[a-zA-Z]+$');
      if(checkLetter.test(coordinatesValue.charAt(0)) && coordSign.includes(firstCharCoords)) {
        //Checking the first coordinate, it must be a letter that match with array coordSign

        let checkSecondNum = new RegExp('^[1-9]+$');
        if(checkSecondNum.test(coordinatesValue.charAt(1))) {
          //Checking the second character, it must be a digit
          if(coordinatesValue.length === 2) {
            console.log(coordinatesValue);
          } else {

            if(coordinatesValue.length === 3) {
              let checkThirdNum = new RegExp('^[0]+$');
              if(checkSecondNum.test(coordinatesValue.charAt(1)) && checkLetter.test(coordinatesValue.charAt(2))) {
                console.log('Don\'t write letters after the second coordinates, it will come to mistake');

              } else if(coordinatesValue.charAt(1) == 1 && checkThirdNum.test(coordinatesValue.charAt(2))) {
                //Checking the second and the third characters - both digits. The second character is equal the one, the third is equal to zero
                console.log(coordinatesValue);
              } else {
                console.log('The maximum of digit\'s coordinate value at the battlefield is only 10');
              }
            } else {
              console.log('You wrote too much characters, please write the coordinates correctly, for example: A5, b10, J9, c3. The register doesn\'t matter');
            }

          }
        } else {
          console.log('The second coordinate must be equal with digits above the battlefield');
        }

      } else {
        console.log('The first coordinate must be equal with values on the left side of the battlefield');
      }

    }
  } else {
    console.log('Don\'t use whitespace in the coordinates');
  }
}; //checkCoordinates function


window.onload = init;

function init() {
  let startFire = document.getElementById('firebtn');
  startFire.addEventListener('click', checkCoordinates)
};