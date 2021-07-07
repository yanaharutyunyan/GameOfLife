class GrassAdder extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10
        this.multiply = 0
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;

            var newGrassAdder = new Grass(newX, newY);
            GrassAdderArr.push(newGrassA);
            this.multiply = 0;
        }
    }

}

