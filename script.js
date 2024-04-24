// Battleship, 4 deck's (4 cell's) - 1 unit;
// Cruiser, 3 deck's (3 cell's) - 2 unit's;
// Destroyer, 2 deck's (2 cell's) - 3 unit's;
// Combat ship, 1 deck (1 cell) - 4 unit's;
// 

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

let model = {
  ships: [ 
    { shipLength: 4, coordinates: [01, 02, 03, 04], hits: ['', '', '', ''] },
  ],
  fire: function(coordinates) {
    
  }
};

let controller = {
  getCoords: function() {
    let coordSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let coordinates = document.getElementById('coordinates');
    let startFire = document.getElementById('firebtn');

    startFire.addEventListener('click', function() {
      let coordValue = coordinates.value;

      if(coordValue.length === 1) {
        alert('Need one more character');
      } else if(coordValue.length > 2) {
        alert('You wrote too much characters');
      } else if(coordValue.length === 2) {
        let firstCharCoords = coordValue.charAt(0).toUpperCase();

        if(!coordSign.includes(firstCharCoords)) {
          alert('For the first sign you need to use letters which you can see on the left panel of the game field');
        } else if(coordValue.charAt(1) < 0 || coordValue.charAt(1) > 10) {
          alert('For the second sign you need to use number from 0 to 10');
        }
      }

    });
  }
};


controller.getCoords()
