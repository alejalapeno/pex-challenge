function pipe(...functionsList) {
	function pipeline(input) {
		return functionsList.reduce((previousReturnedValue, func) => {
			return func(previousReturnedValue);
		}, input);
	}

	return pipeline;
}

module.exports = {pipe};
