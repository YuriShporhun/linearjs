/**
 * Represent a table which contains training examples and target variable.
 */
class Grid {

    _checkInit(x, y) {
        if(!Array.isArray(x)) {
            throw new TypeError('The x variable has to be an array');
        }
        if(!Array.isArray(y)) {
            throw new TypeError('The y variable has to be an array');
        }
        for(let i = 0; i < x.length; i++) {
            if(!x[i] instanceof Array) {
                throw new TypeError('One of the training set columns is not an array');
            }
        }
        for(let i = 0; i < x.length; i++) {
            if(x[i].length != y.length) {
                throw new TypeError('x and y have to have the same length');
            }   
        }
    }

    _afterInit() {
        this._x.unshift(new Array(this.rowCount).fill(1));
        this._tx = this._x[0].map(
            (col, i) => this._x.map(row => row[i])
        );
        this._biasColumnIndex = 0;
    }

    /**
     * Returns the bias column index
     * @returns {Number} Bias column index, filled with 1's
     */
    get biasColumnIndex() {
        return this._biasColumnIndex;
    }

    /** 
     *  Constructor will automatically add a bias column. 
     *  @param {Array<Array<Number>>} x training examples
     *  @param {Number[]} y target variable
    */
    constructor (x, y) {
        this._checkInit(x, y);
        this._x = x;
        this._y = y;
        this._afterInit();
    }

    append(x) {
        if(x.length != this.rowCount) {
            throw RangeError(`You can append only column with length ${this.rowCount}`)
        }
        this._x.push(x);         
    }

    /**
     * Returns the number of colums in the training set
     * @returns number of columns in the training set
     */
    get colCount() {
        return this._x.length;
    }

    /**
     * Returns the number of rows in the data set.
     */
    get rowCount() {
        return this._y.length;
    }

    /**
     * Returns a column by index
     * @returns A column from the training example
     */
    column(index) {
        if(index >= this.colCount || index < 0) {
            throw new RangeError(`The index parameter cannot be less than zero or greater than your training set colums count (${this.colCount})`)
        }
        return this._x[index];
    }

    /** 
     * 
     */
    updateColumn(index, x) {
        if(index === this._biasColumnIndex) {
            throw new RangeError('You cannot update the bias column');
        }
        if(index >= this.colCount || index < 0) {
            throw new RangeError(`The index parameter cannot be less than zero or greater than your training set colums count (${this.colCount})`)
        }
        if(!Array.isArray(x)) {
            throw new TypeError('The x variable has to be an array');
        }
        if(x.length != this.rowCount) {
            throw new TypeError(`x has to be an 1x${this.rowCount} array`);
        } 
        this._x[index] = x.slice(); 
    }

    /**
     * 
     * @param {Number} index
     * @returns {Number[]} 
     */
    row(index) {
        if(index >= this.rowCount || index < 0) {
            throw new RangeError(`The index parameter cannot be less than zero or greater rgen your training set rows count (${this.rowCount})`)
        }
        return this._tx[index];
    }

    /**
     * Returns the training set
     * @returns {Array<Array<Number>>} training set
     */
    get x() {
        return this._x;
    }

    /**
     * Returns the target variable
     * @returns {Number[]} target variable
     */
    get y() {
        return this._y;
    }

    target(index) {
        return this._y[index];
    }

    /**
     * Logs both the training set and the target variable
     */
    log() {
        const merged = [
            ...this.x, 
            ...this.y
        ]
        console.log(merged)
    }
}

export default Grid