const escape = require('escape-html')

text = `
            <div id="timetable-item" class="component__timetable">
            <div class="timeline timeline__component">
          
							<div id="content-page">
      <h1 class="page-title">Schedule</h1>
      <div>
        <h3>Saturday</h3>
        <ul>
            <li>
                10:00 - Hackers arrive
            </li>
            <li>
                11:00 - Opening talks
            </li>
            <li>
                12:00 - Hacking begins!
            </li>
            <li>
                13:00 - Lunch - Sandwich buffet
            </li>
            <li>
                18:30 - Dinner - Chicken/vegetable balti with rice (from <a href="http://thebaltiroom.com" target="_blank">The Balti Room</a>)
            </li>
            <li>
                20:00 - Minigame(s)
            </li>

        </ul>
        <h3>Sunday</h3>
        <ul>
            <li>
                09:00 - Breakfast - Bacon/sausage rolls (<a href="img/breakfast.jpg" target="_blank">menu</a>)
            </li>
            <li>
                10:00 - Call for submissions
            </li>
            <li>
                13:00 - Hacking ends
            </li>
            <li>
                13:30 - Presentations begin
            </li>
            <li>
                14:30 - Lunch - Fish and chips (<a href="img/fishchips.jpg" target="_blank">menu</a>)
            </li>
            <li>
                17:30 - Closing ceremony
            </li>
        </ul>
      </div>
    </div>					
	
      </div>
    </div>
`

console.log(escape(text))