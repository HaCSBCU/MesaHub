Vue.component('time-component', {
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
