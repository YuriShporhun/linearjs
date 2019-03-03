import Grid from './grid'
import Model from './model'
import LossFunctions from './loss-functions'

class Optimizer {
    /**
     * 
     * @param {Number} alpha 
     * @param {LossFunctions} loss 
     */
    constructor(alpha, loss) {
        this.alpha = alpha;
        this.loss = loss;
    }

    /**
     * 
     * @param {Grid} grid 
     * @param {boolean} logging 
     */
    optimize(grid, logging = false, done = null) {

        if (typeof done !== 'function' && done !== null) {
            throw new TypeError('done is not a function');
        }

        if(logging === true) {
            console.log('Optimizer status: initialization')
        }

        let model = new Model(grid, true);

        for(let iter = 0; iter < 100; iter++) {

            let theta = model.get;
            const gradients = new Array(theta.length);
            gradients.fill(0);

            let J = 0;
                      
            for(let i = 0; i < grid.rowCount; i++) {
                let row = grid.row(i).slice();
                const h = row.map( (x, idx) => {
                    return x * theta[idx];
                }).reduce( (a, v) => a + v);

                for(let j = 0; j < theta.length; j++) {
                    gradients[j] += (h - grid.target(i)) * row[j]; 
                }

                J += Math.pow(h - grid.target(i), 2)
            }

            J *=  (1/ (2 * grid.rowCount)) 
            if(logging === true) {
                console.log(`-- Cost function: ${J}`);
            }

            theta = theta.map((v, i) => v - this.alpha * gradients[i]);
            model.update(theta);
        }

        if(logging === true) {
            console.log('Optimizer status: done')
        }

        if(done)
        {
            done();
        }

        return model;
    }
}

export default Optimizer