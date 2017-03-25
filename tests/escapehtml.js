const escape = require('escape-html')

text = `
<div class="timeline timeline__page">

<table>

            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Title</th>
              <th>Description</th>
            </tr>

            <tr>
              <td>10am</td>
              <td>11am</td>
              <td>Arrival</td>
              <td class="description">Hackers arrive at BrumHack 6.0!</td>
            </tr>

            <tr>
              <td>11am</td>
              <td>12pm</td>
              <td>Opening Talks</td>
              <td class="description">Opening talks start!</td>
            </tr>

            <tr>
              <td>12pm</td>
              <td>-</td>
              <td>Hacking Starts</td>
              <td class="description">Hacking starts! Good luck :)</td>
            </tr>

            <tr>
              <td>1pm</td>
              <td>2pm</td>
              <td>Lunch</td>
              <td class="description">Lunch will be served - Sandwhich Buffet!</td>
            </tr>

            <tr>
              <td>6:30pm</td>
              <td>7:30pm</td>
              <td>Dinner</td>
              <td class="description">Dinner will be served - Chicken/vegetable balti with rice (from The Balti Room)</td>
            </tr>

            <tr>
              <td>8pm</td>
              <td>9pm</td>
              <td>Minigame(s)</td>
              <td class="description">We will be doing a few minigames to keep you entertained!</td>
            </tr>


            <!-- CHANGE DAY -->
            <tr class="timeline__page__day">
              <td colspan="5">Sunday</td>
            </tr>

            <tr>
              <td>9am</td>
              <td>10am</td>
              <td>Breakfast!</td>
              <td class="description">Bacon/sausage rolls will be served for breakfast!</td>
            </tr>

            <tr>
              <td>10am</td>
              <td>11am</td>
              <td>Submissions</td>
              <td class="description">Call for submissions, start getting ready to present at 12!</td>
            </tr>

            <tr>
              <td>1pm</td>
              <td>-</td>
              <td>Hacking Ends!</td>
              <td class="description">Stop what you're doing, hacking has now come to a close.</td>
            </tr>

            <tr>
              <td>1:30pm</td>
              <td>2:30pm</td>
              <td>Presentations</td>
              <td class="description">Presentations will start, this is your chance to present your project to everybody at BrumHack!</td>
            </tr>

            <tr>
              <td>2:30pm</td>
              <td>4:00pm</td>
              <td>Closing Ceremony</td>
              <td class="description">We will announce the winners and finally close BrumHack 6.0, time for you to get some sleep!</td>
            </tr>
          </table>
		  </div>
`

console.log(escape(text))