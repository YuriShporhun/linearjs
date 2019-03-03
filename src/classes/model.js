import Grid from './grid'

class Model {
    /**
     * 
     * @param {Grid} grid 
     */
    constructor(grid) {
        this._grid = grid;
        this._theta = new Array(grid.colCount)
        this._theta = this._theta.fill(0)
    }

    /**
     * 
     * @param {Array} optimizedTheta 
     */
    update(optimizedTheta) {
        if(optimizedTheta.length != this._theta.length) {
            throw new Error(`optimizeTheta and theta do not have the same length
            -optimizedTheta ${optimizedTheta.length} -theta ${this._theta.length}`);
        }
        this._theta = optimizedTheta.slice();
    }

    get get() {
        return this._theta;
    }
}

export default Model