let LivingCreature = require('./class')
module.exports = class GrassAdder extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10
        this.multiply = 0
    }
    mul() {

        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];


        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrassAdder = new Grass(newX, newY);
            grassArr.push(newGrassAdder);
            this.multiply = 0;
        }
    }
}

