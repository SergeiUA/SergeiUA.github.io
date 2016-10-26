require(
	[
	'model',
	'view',
	'controller',
	'jquery'
	],
	function (Model, View, Controller, $) {
		var firstToDoList = ['learn javascript', 'learn html', 'make coffe'];
		var model = new Model(firstToDoList);
		var view = new View(model);
		var controller = new Controller(model, view);
	}
	);