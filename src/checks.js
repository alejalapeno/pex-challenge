const {List, Map} = require('immutable');

function isString(value) {
	return typeof value === 'string';
}

function isSentenceList(item) {
	return List.isList(item) && item.every(isString);
}

module.exports = {
	isString,
	isSentenceList,
};
