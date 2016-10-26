'use strict';

$( () => {
	const testData = {
		title: 'JavaScript тест',
		data: [{
			question: 'Какой формат передачи данных наиболее распостранен?',
			answers: ['XML', 'SQL', 'JSON', 'TXT'],
			rightAnswer: [3]
		}, {
			question: 'Выберите правильный вариант фрагмента XML файла',
			answers: ['&lt;greeting&gt;Hello, world!&lt;/greeting&gt;', '&lt;greeting Hello, world!&gt;', '&lt;greeting&gt;Hello, world!&lt;/&gt; '],
			rightAnswer: [1]
		}, {
			question: 'Какой объект для работы с XML файлами втроен во все современные браузеры?',
			answers: ['XML', 'XMLHttpRequers', 'XMLParser', 'Такого объекта нет. Необходимо пользоваться внешними библиотеками.'],
			rightAnswer: [4]
		}, {
			question: 'С помощью какого объекта осуществляется доступ к локальному хранилищу в современных браузерах?',
			answers: ['LocalStorage', 'Storage', 'cookies', 'localStorage'],
			rightAnswer: [4]
		}, {
			question: 'Кто из этих людей работал над созданием языка JavaScript?',
			answers: ['Бренден Эйх', 'Джеймс Гослинг', 'Марк Андрессен', 'Билл Джой', 'Расмус Лердорф'],
			rightAnswer: [1,3,4]
		}]
	};


	localStorage.setItem('testArr', JSON.stringify(testData));

	const test = localStorage.getItem('testArr');
	const myTest = JSON.parse(test);

	const html = $(`#testBox`).html();
	const content = tmpl(html, myTest);
	$(`.wrapper`).append(content);

	$(`input[type='checkbox']`).on('click', function(){
		if($(this).attr(`checked`)) { 
			$(this).removeAttr(`checked`);
		} else {
			this.setAttribute(`checked`, `true`);
		}
	});

	let rightAnswers = [];
	function rightAnswersArr() {
		for ( let i = 0; i < myTest.data.length; i++ ) {
			let str;
			for( let item of myTest.data[i].rightAnswer ) {
				str = `answer_${i+1}_${item}`;
				rightAnswers.push(str);
			}
		}
	};
	rightAnswersArr();

	$(`button[type='submit']`).on('click', (e) => {
		e.preventDefault();

		let countUserAnswers = $(`input[checked='true']`).length;
		let userAnswers = [];
		function userAnswersArr() {
			for( let i = 0; i < countUserAnswers; i++)  {
				let userAnswerId = $(`input[checked='true']`).eq(i).attr('id');
				userAnswers.push(userAnswerId);
			}
		};
		userAnswersArr();

		let countRightUserAnswers = 0;
		let idx = 0;
		for( let i = 0; i < countUserAnswers; i++) {
			idx = userAnswers.indexOf(rightAnswers[i]);
			if (idx >= 0) countRightUserAnswers++;
		};

		let checkMinAnswers = 0;
		for (let i = 0; i < myTest.data.length; i++) {
			let elem = $(`.question__block${i+1} input[checked='true']`);
			if(elem.length > 0 ){
				checkMinAnswers++;
			}
		};

		let resetTrigger;
		if(countRightUserAnswers == countUserAnswers && countUserAnswers == rightAnswers.length) {
			$(`.summary`).html(`Тест пройден! Правильных ответов ${countRightUserAnswers} из ${rightAnswers.length}.`);
		}else if(rightAnswers.length < countUserAnswers){
			$(`.summary`).html(`Тест не пройден! Дано неверное количество ответов: ${countUserAnswers}. Нужно дать: ${rightAnswers.length} ответов.`);
		}else if(rightAnswers.length > countUserAnswers){
			$(`.summary`).html(`Выберите как минимум ${rightAnswers.length} ответов.`);
			resetTrigger = 0;
		}else if(checkMinAnswers < myTest.data.length) {
			$(`.summary`).html(`Выберите как минимум 1 ответ в каждом блоке вопросов.`);
			resetTrigger = 0;
		}else if(rightAnswers.length != countRightUserAnswers){
			$(`.summary`).html(`Тест не пройден! Правильных ответов ${countRightUserAnswers} из ${rightAnswers.length}.`);
		} 
		$(`.popup__overlay`).show();

		$(`button[type='ok']`).on('click', (e) => {
			e.preventDefault();
			$(`.popup__overlay`).hide();
			if(resetTrigger != 0){
				$(`input:checkbox`).prop(`checked`, false).removeAttr(`checked`);
				resetTrigger = 0;
			};
		});

	});

});