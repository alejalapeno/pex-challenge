const {pipe} = require('./pipe');

function concat(list) {
	return list.join('. ');
}

function punctuate(sentence) {
	return `${sentence}.`;
}

function makeSentence(list) {
	return pipe(concat, punctuate)(list);
}

module.exports = {makeSentence};
