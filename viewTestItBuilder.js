//var input = `
//{
//	"actions": [
//		{
//			"class": ".addButton",
//			"action": "click"
//		},
//		{
//			"class": ".header",
//			"expected": {
//				"compare": "text",
//				"value": "My Header"
//			}
//		}, {
//				"class": ".closeButton",
//				"action": "click"
//		},
//		{
//			"class": ".closeButton",
//			"expected": {
//				"compare": "text",
//				"value": "gray"
//			}
//		}
//	]
//}
//`;

function viewTestBuilder(input) {
	//var input = JSON.parse(input);
	var output = '';
	var actionList = [];

	input.actions.forEach(function (task) {

		if (task.action) {
			if (task.action === 'click') {
				actionList.push(`element(by.css('${task.class}')).click();`);
			}
		}


		if (task.expected) {
			var actionsString = '';
			actionList.forEach(function (item) {
				actionsString += item + ' ';
			});

			if (task.expected.compare === 'text') {
				output += `
				it('expect text to be ${task.expected.value}', function () {
					${actionsString}
					expect(element(by.css(${task.class}))).to.eventually.equal('${task.expected.value}');
				});
				`;
				actionsString = [];
			}

		}

	});

	return output;
}

module.exports = viewTestBuilder;
