var time = new Vue({
    el: '#time',
    data: {
        timeLeft: '24:00:00'
    }
});

var announcements = new Vue({
    el: '#announcements',
    data: {
        test: [
            {
                title: 'Title 1',
                date: '11th March 20:15',
                body: 'Here is some body text'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            },
            {
                title: 'Title 2',
                date: '11th March 20:17',
                body: 'Here is some body text which is the second item!'
            }
        ]
    }
});

var workshops = new Vue({
    el: '#workshops',
    data: {
        workshops: [
            {
                title: "Node JS",
                img: '/img/workshops/alex.jpg',
                location: 'MP242',
                time: "3pm"
            },
            {
                title: "Git",
                img: '/img/workshops/panda.jpg',
                location: 'MP242',
                time: "3pm"
            }
            ,
            {
                title: "Hackathons",
                img: '/img/workshops/joe.jpg',
                location: 'MP242',
                time: "3pm"
            }
            ,
            {
                title: "Something",
                img: '/img/workshops/oliver.jpg',
                location: 'MP242',
                time: "3pm"
            }
            ,
            {
                title: "Something",
                img: '/img/workshops/oliver.jpg',
                location: 'MP242',
                time: "3pm"
            }

        ]
    }
});

var timeline = new Vue({
    el: '#timeline',
    data: {

    },
    created: function(){
        // setTimeout(function(){
        //     var timetable = new Timetable();
        //     timetable.setScope(9, 23);
        //     timetable.addLocations(['Room 1', 'Room 2', 'Room 3'])
        //     timetable.addEvent('Event 1', 'Room 1', new Date(2015,7,17,10,45), new Date(2015,7,17,12,30));
        //     timetable.addEvent('Event 2', 'Room 2', new Date(2015,7,17,10,45), new Date(2015,7,17,12,30));
        //     timetable.addEvent('Evetn 3', 'Room 3', new Date(2015,7,17,10,45), new Date(2015,7,17,12,30));
        //
        //     //Render
        //     var renderer = new Timetable.Renderer(timetable);
        //     renderer.draw('.timetable');
        // },100);

    }
});