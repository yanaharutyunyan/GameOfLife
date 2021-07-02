function generator(matLen, gr, grEat, grPred, grEg1, grEg2) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grPred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grEg1; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < grEg2; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }


    return matrix;
}
let side = 20;

let matrix = generator(30, 20, 20, 5, 20, 20);






var grassArr = []
var grassEaterArr = []
var PredatorArr = []
var Energy1Arr = []
var Energy2Arr = []



function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                console.log(matrix[y][x])
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat);
            }
            else if (matrix[y][x] == 3) {
                var grPred = new Predator(x, y);
                PredatorArr.push(grPred)
            }
            else if (matrix[y][x] == 4) {
                var grEg1 = new Energy1(x, y);
                Energy1Arr.push(grEg1)
            }
            // else if (matrix[y][x] == 5) {
            //     var grEg2 = new Energy2(x, y);
            //     Energy2Arr.push(grEg2)
            // }
        }
    }

    console.log(grassArr);
}







function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {

                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {

                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {

                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {

                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat()
    }
    for (var i in PredatorArr) {
        PredatorArr[i].mul();
        PredatorArr[i].eat()
    }
    for (var i in Energy1Arr) {
        if(PredatorArr.length <= 10) {
            Energy1Arr[i].anhayt();
        }

    }
}
for (var i in Energy2Arr) {
    if(PredatorArr.length <= 3) {
        Energy2Arr[i].anhayt1();
    }

}
