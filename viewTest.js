var input = `
{
	"uri": "some dummy uri",
	"actions": [
		{
			"class": ".addButton",
			"action": "click"
		},
		{
			"class": ".header",
			"expected": {
				"compare": "text",
				"value": "My Header"
			}
		}, {
				"class": ".asdfdsfsdf button",
				"action": "click"
		}, {
				"class": ".closeButton",
				"action": "click"
		},
		{
			"class": ".closeButton",
			"expected": {
				"compare": "text",
				"value": "gray"
			}
		}
	]
}
`;
var viewTestItBuilder = require('./viewTestItBuilder.js');

function viewTest(input) {

	//var input = JSON.parse(input);
	
	var title = 'some title';
	var uri = 'some uri';

	var output = `
		var auth = require('../util/Auth');
		var ss = require('../util/screenshoter');
		var FileBrowser = require('../components/FileBrowser');

		describe('ViewWipAttachmentsEdit', function () {
			this.timeout(60000);

			var EC = protractor.ExpectedConditions;
			var fileBrowserTableEl = FileBrowser.getTable();

			before(function () {
				auth.doLogin();
				auth.checkAgreementModal();
				browser.get(asdf);
			});

			after(function () {
				// auth.doLogout();
			});

			afterEach('take a screenshot if a test fails', function () {
				if (this.currentTest.state === 'failed') {
					ss.writeSS(this.currentTest.ssName);
				}
			});

			describe('', function () {
				${viewTestItBuilder(input)}
			});
		});`;

	return output;
}

//console.log(viewTest(JSON.parse(input)));
module.exports = viewTest;
