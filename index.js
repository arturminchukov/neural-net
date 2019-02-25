const NeuralNet = require('./src/neuralNet');

const trainingSets = [{
    answer: 0,
    inputs: [0, 0]
}, {
    answer: 0,
    inputs: [0, 0]
}, {
    answer: 1,
    inputs: [1, 0]
}, {
    answer: 1,
    inputs: [0, 1]
}, {
    answer: 0,
    inputs: [0, 0]
}, {
    answer: 1,
    inputs: [1, 0]
}, {
    answer: 1,
    inputs: [0, 1]
}, {
    answer: 0,
    inputs: [0, 0]
}, {
    answer: 1,
    inputs: [1, 1]
}, {
    answer: 1,
    inputs: [0, 1]
}];

const trainingSets2 = [
    {
        answer: 1,
        inputs: [1]
    }, {
        answer: 0,
        inputs: [0]
    }
];


const neuralNetwork = new NeuralNet({
    inputs: 2,
    outputs: 1,
    hiddenLayers: [],
    trainingCoef: 0.2,
    trainingError: 0.1,
});

neuralNetwork.train(trainingSets);

console.log('0 0 = ',neuralNetwork.find([0, 0]));
console.log('0 1 = ',neuralNetwork.find([0, 1]));
console.log('1 0 = ',neuralNetwork.find([1, 0]));
console.log('1 1 = ',neuralNetwork.find([1, 1]));
