class Energy1 extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 0
        this.multiply = 0;
        
    }
    anhayt() {
        console.log(PredatorArr.length)
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY);
            PredatorArr.push(newPredator);
        }
    }
}