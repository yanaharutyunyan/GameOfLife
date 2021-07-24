let LivingCreature = require('./class')
module.exports = class Energy2 extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 0
        this.multiply = 0;
    }
    anhayt1() {
        
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newGrassEater = new GrassEater(newX, newY);
            GrassEater.push(newGrassEater);
        }
    }
}