const {List, Map} = require('immutable');

function isString(value) {
	return typeof value === 'string';
}

function isSentenceList(item) {
	return List.isList(item) && item.every(isString);
}

function isWalkable(fieldValue) {
	return List.isList(fieldValue) || Map.isMap(fieldValue);
}

module.exports = {
	isString,
	isSentenceList,
	isWalkable,
};
