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
