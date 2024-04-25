// Battleship, 4 deck's (4 cell's) - 1 unit;
// Cruiser, 3 deck's (3 cell's) - 2 unit's;
// Destroyer, 2 deck's (2 cell's) - 3 unit's;
// Combat ship, 1 deck (1 cell) - 4 unit's;
// 

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

let model = {
  ships: [
    { shipLength: 4, coordinates: [01, 02, 03, 04], hits: ['', '', '', ''] },
  ],
  fire: function (coordinates) {

  }
};

let controller = {
  getCoords: function () {
    let coordSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let coordinates = document.getElementById('coordinates');
    let startFire = document.getElementById('firebtn');

    startFire.addEventListener('click', function () {
      let coordValue = coordinates.value;
      let firstCharCoords = coordValue.charAt(0).toUpperCase();

      if(!coordValue.includes(' ')) {
        if(coordValue.length < 1 || coordValue.length === 1) {
          console.log('Необходимо указать координаты из двух значений');
        } else if (coordValue.length === 2) {
          let reg = new RegExp('^[1-9]+$');
          if(!coordSign.includes(firstCharCoords)) {
            console.log('Первая координата должна соответствовать букве в левой части игрового поля')
          } else if (!reg.test(coordValue.charAt(1))) {
            console.log('Вторая координата должна соответствовать числу в верхней части игрового поля');
          }
        } else if(coordValue.length > 3) {
          console.log('Введено слишком много символов.');
        } else if(coordValue.length === 3) {
          let regLetter = new RegExp('^[a-zA-Z]+$');
          let regMatch = new RegExp('^[0-9]+$');
          if((coordValue.charAt(1) == 0 && regMatch.test(coordValue.charAt(2)))) {
            console.log('Указывайте пожалуйста координаты без лишних нулей после буквы: А5, В10. Указание координаты как F00, С09 или A0B является ошибкой.');
          } else if((regLetter.test(coordValue.charAt(1)) && regMatch.test(coordValue.charAt(2)))) {
            console.log('Указывайте пожалуйста координаты в значении Буква-Цифра: А7, вторая буква в координатах AB5 является ошибкой.');
          } else if(!(coordValue.charAt(1) == 1 && coordValue.charAt(2) == 0)) {
            console.log('Максимальное численное значение координаты на поле равно 10.');
          } 
        }
      } else {
        console.log('Вводимые координаты не должны содержать пробелов');
      }


      // Проверка на F0F, A0B, C1D
      // Проверка только чисел 000, 123, 777
      // Проверка только букв ААА, BBB, CGD

    }); //startFire.addEventListener
  } //getCoords: function
}; //controller

controller.getCoords()
