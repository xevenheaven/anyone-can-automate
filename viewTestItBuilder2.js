//var input = `
//{
//	"uri": "some uri alskdfhalskjdf",
//	"actions": [
//		{
//			"name": "Action 1",
//			"$$hashKey": "object:3",
//			"class": ".someClass",
//			"id": "someId",
//			"actionType": "text",
//			"expectedVal": "asdfsdfsdf",
//			"isAdded": true
//		},
//		{
//			"name": "Action 2",
//			"$$hashKey": "object:4",
//			"class": ".someClass2",
//			"actionType": "visible",
//			"expectedVal": "Yes",
//			"isAdded": true
//		}
//	]
//}
//`;

function viewTestBuilder(input) {
	//var input = JSON.parse(input);
	var output = '';
	var actionList = [];

	input.actions.forEach(function (action) {

		var object = null;
		if (action.isAdded === false) {
			return;
		} else {
			if (action.id) {
				object = `element(by.id('${action.id}'))`
			} else if (action.class) {
				object = `element(by.css('${action.class}'))`
			}
			
			if ( object && action.actionType === 'text') {
				output += `
				it('expect text to be ${action.expectedVal}', function () {
					var object = ${object};
					object.click();
					expect(object.getText()).to.eventually.equal('${action.expectedVal}');
				});
				`;
			} else if ( object && action.actionType === 'visible') {
				output += `
				it('expect element to be displayed', function () {
					var object = ${object};
					object.click();
					expect(object.isDisplayed());
				});
				`;
			} 
			
		}
	});

	return output;
}

//console.log(viewTestBuilder(input));
module.exports = viewTestBuilder;
