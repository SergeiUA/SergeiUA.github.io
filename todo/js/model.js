define(
	'model',
	[],
	function() {
		function Model(data) { 

			var self = this;

			self.data = data;

			self.addItem = function (item) {
				if (item.length === 0){
					return;
				}

				self.data.push(item);

				return self.data;
			};

			self.removeItem = function (item) {
				var index = self.data.indexOf(item);

				if (index === -1){
					return;
				}

				self.data.splice(index, 1);

				return self.data;
			};

			self.editItem = function (item, newItem) {
				if (newItem.length === 0){
					return;
				}

				var index = self.data.indexOf(item);

				self.data.splice(index, 1, newItem);
				return self.data;
			};

		}
		return Model;
	}
	);