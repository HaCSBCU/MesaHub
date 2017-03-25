const escape = require('escape-html')

text = `
            <div id="timetable-item" class="component__timetable">
            <div class="timeline timeline__component">
          
												<table class="table">
													<tr>
														<td><strong>Time</strong</td>
														<td><strong>Activity</strong></td>
														<td><strong>Location</strong></td>
													</tr>
													<tr>
														<td>10:00</td>
														<td>Registration</td>
														<td>Main Reception </td>
													</tr>
													<tr>
														<td>11:00</td>
														<td>Opening Ceremony</td>
														<td>B200 Lecture Theatre</td>
													</tr>
													<tr>
														<td>11:30</td>
														<td>Ice Breaker</td>
														<td>B200 Lecture Theatre</td>
													</tr>
													<tr>
														<td>12:00</td>
														<td><strong>Hacking Begins</strong></td>
														<td>Everywhere</td>
													</tr>
													<tr>
														<td>13:00</td>
														<td>Lunch</td>
														<td>Canteen</td>
													</tr>
													<tr>
														<td>14:00</td>
														<td>Git & GitHub Workshop - GitHub</td>
														<td>Workshop Room</td>
													</tr>
													<tr>
														<td>15:00</td>
														<td>Design Thinking Workshop - Accenture</td>
														<td>Workshop Room</td>
													</tr>
													<tr>
														<td>16:00</td>
														<td>iOS Workshop - City Tech Society</td>
														<td>Workshop Room</td>
													</tr>
													<tr>
														<td>17:00</td>
														<td>Web Development (Reactjs) Workshop - Findmypast</td>
														<td>Workshop Room</td>
													</tr>
													<tr>
														<td>18:00</td>
														<td>Mini Event - Accenture</td>
														<td>Workshop Room</td>
													</tr>
													<tr>
														<td>19:00</td>
														<td>Dinner</td>
														<td>Canteen</td>
													</tr>
													<tr>
														<td>20:30</td>
														<td>Mini Game - !Light</td>
														<td>B200 Lecture Theatre</td>
													</tr>
													<tr>
														<td>22:30</td>
														<td>Mini Game - Werewolf</td>
														<td>B200 Lecture Theatre</td>
													</tr>
													<tr>
														<td>00:00</td>
														<td>Midnight Snack</td>
														<td>OTLT Foyer</td>
													</tr>
												</table>
											
												<table class="table">
													<tr>
														<th class="text-center"> Sunday </th>
													</tr>
												</table>
												<table class="table">
													<tr>
														<td><strong>Time</strong</td>
														<td><strong>Activity</strong></td>
														<td><strong>Location</strong></td>
													</tr>
													<tr>
														<td>08:00</td>
														<td>Breakfast</td>
														<td>Canteen</td>
													</tr>
													<tr>
														<td>12:00</td>
														<td><b>Hacking Ends</b></td>
														<td>Everywhere</td>
													</tr>
													<tr>
														<td>12:15</td>
														<td>Lunch</td>
														<td>Canteen</td>
													</tr>
													<tr>
														<td>13:00</td>
														<td>Judging & Presentations Begin</td>
														<td>Hacking Space</td>
													</tr>
													<tr>
														<td>16:00</td>
														<td>Awards and Closing Ceremony</td>
														<td>B200 Lecture Theatre</td>
													</tr>
													<tr>
														<td>17:00</td>
														<td>End of event</td>
														<td>Everywhere</td>
													</tr>
												</table>
		</div>
      </div>
    </div>
`

console.log(escape(text))