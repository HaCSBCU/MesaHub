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
        ],
        refreshComp: false
    },
    created: function(){
        var refreshComp = this.refreshComp;
        var refresh = function(){
            $.ajax({
                type: 'GET',
                url: '/admin/get-announcements',
                success: function(data){
                    if(data.length > announcements.announcementsList.length && refreshComp){
                        var icon = "/img/bullhacks-head.png";
                        Push.create("New Announcement!", {
                            body: data[data.length - 1].body,
                            icon: icon,
                            timeout: 4000,
                            onClick: function () {
                                window.focus();
                                this.close();
                            }
                        });
                    }
                    announcements.announcementsList = data.reverse();
                    refreshComp = true;
                },
                error: function(err){
                    console.log(err);
                }
            })
        };
        refresh();
        setInterval(refresh,3000);
    }
});


var workshops = new Vue({
    el: '#workshops',
    data: {
        events: [],
        refreshComp: false
    },
    created: function(){
        var refreshComp = this.refreshComp;
        var refresh = function(){
            $.ajax({
                type: 'GET',
                url: '/admin/get-events',
                success: function(data){
                    var icon = "/img/bullhacks-head.png";
                    if(data.length > workshops.events.length && refreshComp){
                        Push.create("New Event!", {
                            body: "A new event has been added. Check it out now on MesaHub!",
                            icon: icon,
                            timeout: 4000,
                            onClick: function () {
                                window.focus();
                                this.close();
                            }
                        });
                    }
                    workshops.events = data.reverse();
                    refreshComp = true;
                },
                error: function(err){
                    console.log(err);
                }
            })
        };
        refresh();
        setInterval(refresh,3000);
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