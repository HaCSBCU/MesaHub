var time = new Vue({
    el: '#time',
    data: {
        timeLeft: '24:00:00'
    }
});

var announcements = new Vue({
    el: '#announcements',
    data: {
        announcementsList: [
            {
                date: '11th March 20:15',
                body: 'Here is some body text',
                title: 'Title 1'
            }
        ]
    },
    created: function(){
        // var refresh = function(){
        //     $.ajax({
        //         type: 'GET',
        //         url: '/admin/get-announcements',
        //         success: function(data){
        //             console.log(data);
        //             announcements.announcementsList = data.reverse();
        //         },
        //         error: function(err){
        //             console.log(err);
        //         }
        //     })
        // };
        // refresh();
        // setInterval(refresh,3000);
    }
});

var workshops = new Vue({
    el: '#workshops',
    data: {
        events: [
            {
                title: "Node JS",
                img: '/img/workshops/alex.jpg',
                location: 'MP242',
                time: "3pm"
            }
        ]
    },
    created: function(){
        // var refresh = function(){
        //     $.ajax({
        //         type: 'GET',
        //         url: '/admin/get-events',
        //         success: function(data){
        //             console.log(data);
        //             workshops.events = data.reverse();
        //         },
        //         error: function(err){
        //             console.log(err);
        //         }
        //     })
        // };
        // refresh();
        // setInterval(refresh,3000);
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