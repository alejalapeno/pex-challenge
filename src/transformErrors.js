const {OrderedSet} = require('immutable');
const {makeSentence} = require('./makeSentence');
const {isSentenceList, isWalkable} = require('./checks');
const {pipe} = require('./pipe');

function transformErrors(errors, preserveNestingKeys) {
	return errors.mapEntries(([key, value]) => {
		return [key, format(value, preserveNestingKeys.includes(key))];
	});
}

function reduceFlat(field) {
	function collectErrors(allErrors, currentError) {
		return allErrors.add(isWalkable(currentError)
			? reduceFlat(currentError)
			: currentError);
	}

	return field.reduce(collectErrors, OrderedSet()).flatten(true);
}

function mapNested(field) {
	return field.map((fieldValue) => {
		if (isSentenceList(fieldValue)) {
			return makeSentence(fieldValue);
		}
		if (isWalkable(fieldValue)) {
			return mapNested(fieldValue);
		}

		return fieldValue;
	});
}

function format(fieldValue, preserveNesting) {
	return preserveNesting
		? mapNested(fieldValue)
		: pipe(reduceFlat, makeSentence)(fieldValue);
}

module.exports = transformErrors;
