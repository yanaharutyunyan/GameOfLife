var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var fs = require("fs")

app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect("index.html");

});
server.listen(3000);

function generator(matLen, gr, grEat, grPred, grEg1, grEg2, grAdd, grMonst) {
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
    for (let i = 0; i < grAdd; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < grMonst; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }

    io.sockets.emit("send matrix", matrix)
    return matrix
}


matrix = generator(30, 20, 15, 15, 5, 10, 15, 2);


grassArr = []
grassEaterArr = []
PredatorArr = []
Energy1Arr = []
Energy2Arr = []
GrassAdderArr = []
MonsterArr = []

Grass = require("./grass.js")
GrassEater = require("./GrassEater.js")
Predator = require("./Predator.js")
Energy1 = require("./Energy1.js")
Energy2 = require("./Energy2.js")
GrassAdder = require("./GrassAdder.js")
Monster = require("./Monster.js")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
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
            else if (matrix[y][x] == 6) {
                var grAdd = new GrassAdder(x, y);
                GrassAdderArr.push(grAdd)
            }
            else if (matrix[y][x] == 7) {
                var grMonst = new Monster(x, y);
                MonsterArr.push(grMonst)
            }
        }
    }

}

function Game() {
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
        if (PredatorArr.length <= 10) {
            Energy1Arr[i].anhayt();
        }

    }
    for (var i in Energy2Arr) {
        if (PredatorArr.length <= 3) {
            Energy2Arr[i].anhayt1();
        }
    }
    for (var i in GrassAdderArr) {
        GrassAdderArr[i].mul()
    }
    for (var i in MonsterArr) {
        MonsterArr[i].mul();
        MonsterArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix)
}


setInterval(Game, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = []
    PredatorArr = []
    GrassAdderArr = []
    Energy1Arr = []
    Energy2Arr = []
    MonsterArr = []

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


let flag = true

io.on("connection", function (socket) {
    if (flag) {
        createObject(matrix)
        socket.on("kill", kill);
        socket.on("add grass", addGrass);
        socket.on("add grassEater", addGrassEater);
        flag = false
        console.log(111)
    }
})


var statistics = {};

setInterval(function () {
    statistics.Grass = grassArr.length
    statistics.GrassEater = grassEaterArr.length
    statistics.Predator = PredatorArr.length
    statistics.GrassAdder = GrassAdderArr.length
    statistics.Energy1 = Energy1Arr.length
    statistics.Energy2 = Energy2Arr.length
    statistics.Monster = MonsterArr.length
    fs.writeFileSync("statistics.json",
        JSON.stringify(statistics))
}, 1000)

weather = "summer"

setInterval(function () {

    if (weather == "summer") {
        weather = "autumn"
    }
    else if (weather == "autumn") {
        weather = "winter"
    }
    else if (weather == "winter") {
        weather = "spring"
    }
    else if (weather == "spring") {
        weather = "summer"
    }
    io.sockets.emit("send weather", weather)
}, 4000)


