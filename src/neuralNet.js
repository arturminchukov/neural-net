class NeuralNet {
    constructor(options) {
        const {inputs, outputs, hiddenLayers, trainingCoef, trainingError} = options;

        this.trainingCoef = trainingCoef;
        this.trainingError = trainingError;
        this.layers = [];
        debugger;
        if (hiddenLayers && hiddenLayers.length > 0) {

            this.layers.push({
                weights: this._initializeWeights(hiddenLayers[0], inputs),
                n: hiddenLayers[0]
            });

            for (let i = 1; i < hiddenLayers.length; i++) {
                this.layers.push({
                    weights: this._initializeWeights(hiddenLayers[i], hiddenLayers[i - 1]),
                    n: hiddenLayers[i]
                });
            }

            this.layers.push({
                weights: this._initializeWeights(outputs, hiddenLayers[hiddenLayers.length - 1]),
                n: outputs,
            });
        } else {
            this.layers.push({
                weights: this._initializeWeights(outputs, inputs),
                n: outputs
            })
        }
    }

    find(inputData) {
        const result = this.calculate(inputData);

        return result;
    }

    calculate(inputData) {
        let outputData = inputData;

        this.layers.forEach(layer => {
            layer.outputs = outputData;
            outputData = this._multiplyMatrix(layer.weights, outputData);
        });

        return outputData.length === 1 ? outputData[0] : outputData;
    }

    train(trainingData) {
        trainingData.forEach(data => {
            let error;
            do {
                const answer = this.calculate(data.inputs);
                error = answer - data.answer;

                if (Math.abs(error) > this.trainingError) {
                    this._reCalculateWeights(error);
                }
            } while (this.trainingError < Math.abs(error))
        });
    }

    _reCalculateWeights(error) {
        this.layers.forEach(layer => {
            layer.weights = this._calculateWeights(layer, error);
        })
    }

    _getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    _calculateWeights(layer, error) {
        const {weights, outputs} = layer;
        const rows = weights.length;
        const columns = weights[0].length;
        const result = [];

        for (let i = 0; i < rows; i++) {
            result[i] = [];
            for (let j = 0; j < columns; j++) {
                result[i][j] = this._executeNewWeight(weights[i][j], error, outputs[j]);
            }
        }

        return result;
    }

    _executeNewWeight(prevValue, error, x) {
        const sign = error > 0 ? -1 : 1;
        const xWeight = Math.abs(x) > 0.2 ? 1 : 0;

        return prevValue + sign * this.trainingCoef * xWeight;
    }

    _initializeWeights(rows, columns) {
        const result = [];

        for (let i = 0; i < rows; i++) {
            result[i] = [];
            for (let j = 0; j < columns; j++) {
                result[i][j] = this._getRandomArbitrary(-1, 1);
            }
        }

        return result;
    }

    _approximationFunction(x) {
        // return 1 / (1 + Math.exp(-x));
        return x >= 1.2 ? 1 : 0;
    }

    _multiplyMatrix(mA, mB) {
        const result = [];
        const bLength = (mB[0] && mB[0].length) || mB.length;

        for (let i = 0; i < mA.length; i++) {
            result[i] = [];
            let sum = 0;
            for (let j = 0; j < bLength; j++) {
                sum += mB[j] * mA[i][j];
            }
            result[i] = this._approximationFunction(sum);
        }

        return result;
    };
}

module.exports = NeuralNet;
