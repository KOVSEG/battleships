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
      let coordinatesValue = coordinates.value;
      let firstCharCoords = coordinatesValue.charAt(0).toUpperCase();

      if(!coordinatesValue.includes(' ')) { //Checking whitespace in the coordinates

        if(coordinatesValue.length < 1) {
          console.log('Enter the coordinates');
        } else {

          let checkLetter = new RegExp('^[a-zA-Z]+$');
          if(checkLetter.test(coordinatesValue.charAt(0)) && coordSign.includes(firstCharCoords)) { //Checking the first coordinate, it must be a letter that match with array coordSign

            let checkSecondNum = new RegExp('^[1-9]+$');
            if(checkSecondNum.test(coordinatesValue.charAt(1))) { //Checking the second character, it must be a digit

              if(coordinatesValue.length === 2) {
                console.log(coordinatesValue);
              } else {

                if(coordinatesValue.length === 3) {
                  let checkThirdNum = new RegExp('^[0]+$');
                  if(checkSecondNum.test(coordinatesValue.charAt(1)) && checkLetter.test(coordinatesValue.charAt(2))) {
                    console.log('После второй координаты не указывайте буквы, это приводит к ошибке');
                  } else if(coordinatesValue.charAt(1) == 1 && checkThirdNum.test(coordinatesValue.charAt(2))) { //Checking the second and the third characters - both digits. The second character is equal the one, the third is equal to zero 
                    console.log(coordinatesValue);
                  } else {
                    console.log('Максимальное численное значение координаты на поле равно 10');
                  }
                } else {
                  console.log('Введено слишком много символов, введите координаты корректно, например: A5, b10, J9, c3. Регистр не имеет значения');
                }

              }
            } else {
              console.log('Вторая координата должна соответствовать числу в верхней части игрового поля');
            }

          } else {
            console.log('Первая координата не соотвутствует значениям указанным слева игрового поля');
          }

        }
      } else {
        console.log('Вводимые координаты не должны содержать пробелов');
      }

    }); //startFire.addEventListener
  } //getCoords: function
}; //controller

controller.getCoords()
