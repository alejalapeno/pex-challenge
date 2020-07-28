const {OrderedSet} = require('immutable');
const {makeSentence} = require('./makeSentence');
const {isSentenceList} = require('./checks');
const {pipe} = require('./pipe');

function transformErrors(errors, preserveNestingKeys) {
	return errors.mapEntries(([key, value]) => {
		return [key, format(value, preserveNestingKeys.includes(key))];
	});
}

function reduceFlat(field) {
	return field.toSet().flatten();
}

function mapNested(field) {
	return field.map((fieldValue) => {
		return isSentenceList(fieldValue)
			? makeSentence(fieldValue)
			: mapNested(fieldValue);
	});
}

function format(fieldValue, preserveNesting) {
	return preserveNesting
		? mapNested(fieldValue)
		: pipe(reduceFlat, makeSentence)(fieldValue);
}

module.exports = transformErrors;
