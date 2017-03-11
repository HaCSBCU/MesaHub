Vue.component('countdown', {
    props: ['time'],
    template: `
        <div id="timeComponent" class="component component__time">
            <div class="component__flex">
                <div class="component__left">
                    <img class="vertC__relative" src="/img/icons/time.svg"/>
                </div>
                <div id="countdownClock" class="component__right">
                      <h4 class="component__time__title">Time left:</h4>
                      <div id="clockdiv">
                          <div>
                            <span class="days"></span>
                            <div class="smalltext">Days</div>
                          </div>
                          <div>
                            <span class="hours"></span>
                            <div class="smalltext">Hours</div>
                          </div>
                          <div>
                            <span class="minutes"></span>
                            <div class="smalltext">Minutes</div>
                          </div>
                          <div>
                            <span class="seconds"></span>
                            <div class="smalltext">Seconds</div>
                          </div>
                </div>
            </div>
        </div>
    `
});

//Announcement Component
Vue.component('announcements', {
    template: `
        <div id="announcements">
          <div class="component component__announcement">
            <div class="component__flex">
              <div class="component__left">
                <div class="vertC__relative">
                  <img src="/img/icons/announcement.svg"/>
                  <h4>Announcements</h4>
                </div>
              </div>
              <div class="component__right component__announcement__right">
        
                <slot></slot>
        
              </div>
            </div>
          </div>
        </div>
    `
})

Vue.component('announcement-item', {
    props: ['title', 'body', 'date'],
    template: `
        
        <div class="component__announcement__right__item">
            <div class="component__announcement__right__item__header">
              <h4>{{title}} <span class="vert-line"> | </span> </h4> <p>{{date}}</p> <h5 style="display: none">NEW!</h5>
            </div>
            <h4>{{body}}</h4>
         </div>
    `
});

//Workshop Component
Vue.component('workshops', {
   template: `
            <div class="component component__workshops">
                <div class="component__header">
                    <h3>Events</h3>
                </div>
                <div class="component__workshops__list">
                    <slot></slot>
                </div>
            </div>
   `
});

Vue.component('workshop-item', {
    props: ['name', 'picture', 'location', 'time', 'time2'],
    template: `
        <div class="component__workshops__item">
            <img id="workshop-item-image" :src="picture"/>
            <div class="component__workshops__item__info">
                <h4>{{name}}</h4>
                <p>{{location}} | {{time}} <span v-if="time2">:</span> {{time2}} </p>
            </div>
        </div>
    `

});

//Timeline component
Vue.component('timeline', {
   template: `
        <div class="component float__right">
            <div class="component__header">
                <h3>Timeline</h3>
            </div>
            <div id="timetable-item" class="component__timetable">
            <div class="timeline timeline__component">
          <table>

            <tr>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Title</th>
              <th>Description</th>
            </tr>

            <tr>
              <td>MP242</td>
              <td>9:30am</td>
              <td>11am</td>
              <td>Arrival</td>
              <td class="description">Register at the front desk and get settled into the hackathon</td>
            </tr>

            <tr>
              <td>MP242</td>
              <td>11am</td>
              <td>12pm</td>
              <td>Opening talk</td>
              <td class="description">We shall breif you on the hackathon and give you any information that you may need!</td>
            </tr>

            <tr>
              <td>MP242</td>
              <td>12pm</td>
              <td>Sunday 4pm</td>
              <td>Start hacking</td>
              <td class="description">Hacking can now begin! Make something awesome <3</td>
            </tr>

            <tr>
              <td>MP242</td>
              <td>12pm</td>
              <td>12:30pm</td>
              <td>Team Building</td>
              <td class="description">Alex & Pandelis are hosting a team building session incase anybody does not have a
                team yet. Come along, don't be shy!
              </td>
            </tr>

            <tr>
              <td>Eagle & Ball</td>
              <td>12:30pm</td>
              <td>1:30pm</td>
              <td>Lunch</td>
              <td class="description">Lunch will be served in the Eagle & Ball. Don't worry, we shall announce lunch on
                MesaHub and will lead groups down as and when places are available!
              </td>
            </tr>

            <tr>
              <td>Workshop Room</td>
              <td>2pm</td>
              <td>3pm</td>
              <td>Algolia Workshop</td>
              <td class="description">Pandelis will be doing a workshop on using Algolia, a live search API, to make your
                website a more friendly and produtive experience. This is a powerful tool and one that you do not want
                to miss out on!
              </td>
            </tr>

            <tr>
              <td>Workshop</td>
              <td>3pm</td>
              <td>4pm</td>
              <td>Capgemini Workshop</td>
              <td class="description">Camgemini will be hosting a workshop, be sure to come and check it out!</td>
            </tr>

            <tr>
              <td>Workshop</td>
              <td>4pm</td>
              <td>5pm</td>
              <td>Drawing art with p5.js - Kevin</td>
              <td class="description">Kevin will be walking us through how to draw with the p5.js library. This is a
              rapidly growing library and one which is incredibly powerful. Kevin is a MLH rep and studies at GoldSmiths
              university, this is sure set to be an amazing workshop!</td>
            </tr>

            <tr>
              <td>Eagle & Ball</td>
              <td>6pm</td>
              <td>8pm</td>
              <td>Dinner</td>
              <td class="description">Dinner will be served! Please wait to be called via MesaHub or in person please!</td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>8pm</td>
              <td>10pm</td>
              <td>Games Competiton</td>
              <td class="description">Ollie will be hosting a games competiton in the main room. Head on over for some chill time
                to relax and play some games with fellow hackers.
              </td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>10pm</td>
              <td>11pm</td>
              <td></td>
              <td class="description">Werewolf will be hosted Kevin, this is a legendary MLH game and will not let down at
                BullHacks!
              </td>
            </tr>

            <tr>
              <td>Workshop Room</td>
              <td>11pm</td>
              <td>12am</td>
              <td></td>
              <td class="description">
                Alex & Pandelis will be doing a short talk on how they built MesaHub, what challenges they faced and
                how they intend for it to benefit the Hackathon community in the long run. You will also get to hear about
                upcoming opportunities to join onto the open source project.
              </td>
            </tr>

            <!-- CHANGE DAY -->
            <tr class="timeline__page__day">
              <td colspan="5">Sunday</td>
            </tr>

            <tr>
              <td>Sleeping Room</td>
              <td>12am</td>
              <td>8pm</td>
              <td>Sleep Time!</td>
              <td class="description">You've worked real hard, take some well deserved time to get some shut eye so that
              you are even just a little bit more refreshed in the morning.</td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>8am</td>
              <td>10pm</td>
              <td>Breakfast</td>
              <td class="description">The best time of the morning... breakfast! We shall be serving this in the main room!</td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>12pm</td>
              <td>-</td>
              <td>Hacking Ends!</td>
              <td class="description">Stop your hacking! The hackathon has drawn to an end :( But prizes are on the way!</td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>12:30pm</td>
              <td>1:30pm</td>
              <td>Lunch</td>
              <td class="description">The last supper, come and feast on some amazing food at the Eangle & Ball. As before, please wait to be called!</td>
            </tr>

            <tr>
              <td>Main Room</td>
              <td>2pm</td>
              <td>3pm</td>
              <td>Presentations</td>
              <td class="description">Get your chance to present your idea. The floor is all yours, but keep in mind; you only have two minutes!</td>
            </tr>

            <tr>
              <td>MP242</td>
              <td>3pm</td>
              <td>3:30pm</td>
              <td>Games Intermission</td>
              <td class="description">Whilst we are judging, come and chill out and play a few games. It'll be the perfect way to pass 20 minutes.</td>
            </tr>

            <tr>
              <td>MP242</td>
              <td>2pm</td>
              <td>3pm</td>
              <td>Winners Presentation</td>
              <td class="description">Find out who is the BullHacks champion!</td>
            </tr>


          </table>
        </div>
</div>
        </div>
   `
});

// Vue.component('floating-box', {
//     template:
// })