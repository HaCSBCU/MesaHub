Vue.component('countdown', {
    props: ['time'],
    template: `
        <div id="timeComponent" class="component component__time">
            <div class="component__flex">
                <div class="component__left">
                    <img class="vertC__relative" src="/img/icons/time.svg"/>
                </div>
                <div class="component__right">
                    <h4 class="component__time__title">Time left:</h4>
                    <h1 class="component__time__time">{{time}}</h1>
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
                    <h3>Workshops</h3>
                </div>
                <slot></slot>
            </div>
   `
});

Vue.component('workshop-item', {
    props: ['image', 'title', 'room', 'time'],
    template: `
        <div class="component__workshops__item">
            <img id="workshop-item-image" :src="image"/>
            <div class="component__workshops__item__info">
                <h4>{{title}}</h4>
                <p>{{room}} | {{time}}</p>
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
            <div id="timetable-item" class="timetable"></div>
        </div>
   `
});

// Vue.component('floating-box', {
//     template:
// })