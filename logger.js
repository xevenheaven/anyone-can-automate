var actions = [];

// Inform the background page that this tab should have a page-action
chrome.runtime.sendMessage({
	from: 'logger',
	subject: 'showPageAction'
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (msg, sender, respond) {
	if (msg.from === 'popup' && msg.subject === 'start') {
		alert('Start logging on ' + document.location.href);
		$('*').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			actions.push(parseElement(e.target));
		});
	}

	if (msg.from === 'popup' && msg.subject === 'stop') {
		alert('Stop logging on ' + document.location.href);
		$('*').off('click');

		var actionsList = actions;
		actions = []; // Reset the global list
		respond(actionsList);
	}
});

var parseElement = function (element) {
	var parsedElement = {
		originalElement: element,
		parentElement: element.parentElement,
		tagName: element.tagName.toLowerCase(),
		class: '.' + element.className.replace(/ /g, '.'),
		id: element.id,
		text: element.innerText,
		color: $(element).css('color'),
		visibile: $(element).css('visibility')
	}

	console.log('Element you have interacted with: ' + parsedElement);
	return parsedElement;
};
