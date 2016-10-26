define(
	'view',
	['jquery', 'template'],
	function() {
		function View(model, template) {

			var self = this;

			function init() { 
				var items = tmpl($('#wrapper-template').html());
				$('body').append(items);
				self.elements = {
					input: $('.item-value'),
					addBtn: $('.item-add'),
					listContainer: $('.items-list')
				};
				self.renderList(model.data);
			};

			self.editItem = function (button) {
				var editItems = $('.item-save');
				if(editItems.length > 0) {
					return;
				}
				var item = button.attr('data-value');
				var listItem = button.parent();
				listItem.html('<input type="text" value="' + item + '" class="input-edit"> \ <button class="item-save">Save</button> \ <button data-value="' + item + '" class="item-delete">Delete</button>');
				self.elements.editInput = $('.input-edit');
				self.elements.saveBtn = $('.item-save');
			}

			self.renderList = function (data) {
				var list = tmpl($('#list-template').html(), {data: data});
				self.elements.listContainer.html(list);
			}

			init();
		};
		return View;
	}
	);