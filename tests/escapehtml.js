const escape = require('escape-html')

text = `
            
									<h2>Challenges</h2>

									<p style="text-align:left"> <b>Accenture</b></p>
									<p style="text-align:left"> The Accenture 'Best Artificial Intelligence Hack' invites participants to build a hack using any topic in
										AI / machine learning. Whether it be chatbots, computer vision, speech processing, natural language processing or anything else in the domain
										– demonstrate your innovation through any combination of the above!</p>
									<p style="text-align:left"> A few ground rules: Teams are free to either use existing APIs (such as Microsoft Cognitive Services, IBM Watson, Clarifai.ai, API.ai)
									or use frameworks (such as Google Tensorflow, Microsoft CNTK) – the challenge is tech-agnostic for the underlying platform
									Preference will be given for hacks that combine the use of more than one domain or API – look for interesting ways that various APIs, datasets, or frameworks can be combined.
									Combinations don’t necessarily have to be with AI-related APIs only. E.g., it’s okay to use an AI-related API with a non-AI related API in interesting ways.</p>
									<p style="text-align:left"> If in doubt, ask the Accenture mentors – they will be around to help with problems or with the challenge definition itself
									or give them a shout on <a href="https://hackcity17.slack.com/messages/sponsor-accenture" target="_blank"> Slack </a> </p>

									<p style="text-align:left"> <b>AI Gaming</b></p>
									<p style="text-align:left"> The AI Gaming challenge invites you to create a poker playing intelligent bot and use it to compete against our house bots as
										well as bots created by other participants. To create your bot, sign up at <a href="http://beta.aigaming.com" target="_blank"> http://beta.aigaming.com </a> with
										the code on the poker chip in your welcome pack and we’ll fund your account with 1m satoshi (one hundredth of a bitcoin) for you to play with. </p>
									<p style="text-align:left"> Once registered you’ll have access to our demo client code written in C# for Visual Studio, as well our REST API to use with whatever
										language you like. You’re free to use any strategy you like, from simple rule based engines to more exotic reinforcement learning or Monte Carlo simulation.
										We’ve even got some great prizes up for grabs for the two best bots.</p>
									<p style="text-align:left"> Be sure to speak to us, check out <a href="http://help.aigaming.com" target="_blank"> http://help.aigaming.com </a> or find us on slack
										in <a href="https://hackcity17.slack.com/messages/sponsor-aigaming" target="_blank"> #sponsor-aigaming </a> if you have any questions.</p>



									<p style="text-align:left"> <b>Findmypast</b></p>
									<p style="text-align:left"> The Findmypast challenge is to build a project using any part of the technology stack used by the company, which includes
										 <a href="https://facebook.github.io/react/" target="_blank"> Reactjs </a>, <a href="http://elixir-lang.org/" target="_blank"> Elixir </a>,
										 <a href="http://graphql.org/" target="_blank"> GraphQL </a> and <a href="https://www.docker.com/" target="_blank"> Docker </a>.</p>
								 	<p style="text-align:left"> They’ll be evaluating projects based on the following categories:
										</p><ul>
											<li style="text-align:left"> most creative use of tech </li>
											<li style="text-align:left"> best built by the book project </li>
											<li style="text-align:left"> least amount of code used to deliver the most amount of features </li>
										</ul>
									<p></p>
									<p style="text-align:left"> Teams will be able to pick up points in each category. The winning team of 4 will be awarded a prize by Findmypast.</p>
									<p style="text-align:left"> They're also running an introductory workshop on React. Feel free to speak to them if you have any questions, you can also reach reach them at
										<a href="https://hackcity17.slack.com/messages/sponsor-findmypast" target="_blank"> #sponsor-findmypast</a> on Slack. </p>


									<p style="text-align:left"> <b>.tech Domains</b></p>
									<p style="text-align:left"> .tech are offering a prize for the best interactive website using a .tech domain. </p>
									<p style="text-align:left"> Feel free to make an interactive website on a choice of your own topic. The website must be connected to a
										.tech domain (which are free for all attendees). To get your free .tech domain, all you have to do is follow these simple steps: </p>
									<p>
										</p><ol>
											<li style="text-align:left"> Go to - <a href="https://goo.gl/0LU0i5" target="_blank"> goo.gl/0LU0i5 </a> and fill in your details. </li>
											<li style="text-align:left"> Select HackCity and enter the secret code - "hackcity.tech" and submit </li>
											<li style="text-align:left"> Once your request has been approved, you will recieve a coupon code which you can use at checkout on www.get.tech </li>
										</ol>
									<p></p>

									<p style="text-align:left"> <b>City Tech Society</b></p>
									<p style="text-align:left"> The general challenges set by the hackathon organisers are as follows:</p>
									<ul>
									<li style="text-align:left"> Best No User Interface hack</li>
									<li style="text-align:left"> Best Hack incorporating use of a camera </li>
									<li style="text-align:left"> Most technologies used in a hack </li>
									<li style="text-align:left"> Oldest technologies used in a hack </li>
									<li style="text-align:left"> Best Internet of "stupid" things hack - Prize sponsored by <a href="https://hackcity17.slack.com/messages/sponsor-resinio" target="_blank">Resin.io</a> </li>
								</ul>

								<p style="text-align:left"> There will be prizes for each of the above challenges. Feel free to ask a HackCity organiser if you have any questions. You can also reach them on Slack, they all have hackcity- prepended to their Slack names. </p>
							

`

console.log(escape(text))