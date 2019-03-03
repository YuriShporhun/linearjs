import Grid from './grid'
import mean from '../functions/mean'
import copy from '../functions/copy'

class Scaler {
    /**
     * Creates a new copy of a grid
     * @param {Grid} grid 
     */
    constructor(grid) {
        this._grid = copy(grid);
    }

    get scale() {
        for(let i = 0; i < this._grid.colCount; i++) {
            if(i === this._grid.biasColumnIndex) {
                continue;
            }
            const columnMean = mean(this._grid.column(i));
            const columnMax = Math.max(...this._grid.column(i));
            this._grid.updateColumn(i, 
                this._grid.column(i).map((x) => (x - columnMean) / columnMax)
                );
        }
        return copy(this._grid);
    }
}


export default Scaler