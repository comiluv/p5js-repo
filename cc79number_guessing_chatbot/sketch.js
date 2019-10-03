
	let speech = new p5.Speech(1);
function setup()
{
	noCanvas();
	speech.speak("hello");
	speech.listVoices();

	let bot = new RiveScript();
	bot.loadFile("brain.rive").then(brainReady).catch(brainError);

	function brainReady()
	{
		console.log("Chatbot ready!");
		bot.sortReplies();
		let num = floor(random(100000));
		console.log(num);
		bot.reply("local-user","set " + num);
	}

	function brainError()
	{
		console.log("Chatbot error!");
	}

	let button = select('#submit');
	let user_input = select('#user_input');
	let output = select('#output');

	button.mousePressed(chat);

	function chat()
	{
		let input = user_input.value();
		bot.reply("local-user", input).then(function(reply)
		{
			speech.speak(reply);
			output.html(reply);
		});

	}
}