// if doesnt exist, then we say it is Free Time
var schedule =
    [[["0", "Travel to 671 Sheppard E"],
        ["1730", "Registration"],
        ["1830", "Dinner"],
        ["1915", "Welcome"],
        ["2000", "RLYRC"],
        ["2130", "Hospitality"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["1000", "Tribe Time: Ice Breaker"],
            ["1030", "OUTREACH"],
            ["1230", "Lunch"],
            ["1315", "Tribal Chants"],
            ["1415", "Scatterball"],
            ["1515", "Reading"],
            ["1530", "LOL"],
            ["1545", "SESSION 1"],
            ["1715", "Small Groups"],
            ["1800", "Dinner"],
            ["1900", "Mafia LIVE"],
            ["2000", "LASERS & HIPPOS"],
            ["2200", "Hospitality"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "SLIPS & FLAGS"],
            ["1230", "Lunch"],
            ["1315", "Tribal Chants"],
            ["1400", "REACHOUT"],
            ["1700", "Dinner"],
            ["1745", "WORD"],
            ["1800", "SESSION 2"],
            ["1900", "Small Groups"],
            ["1930", "EPACSE"],
            ["2200", "Hospitality"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "WORD"],
            ["945", "LOL"],
            ["1000", "SESSION 3"],
            ["1115", "Small Groups"],
            ["1145", "TRAVEL"],
            ["1200", "Lunch"],
            ["1330", "TRAVEL"],
            ["1345", "Break"],
            ["1400", "AMAZING RACE"],
            ["1800", "Break / Tribal Chants"],
            ["1815", "WORD"],
            ["1830", "Dinner"],
            ["1915", "CHANTS & LOL"],
            ["1945", "SESSION 4"],
            ["2130", "Conference END"],
            ["100000", "See you next year!"]]];

$('.carousel').slick({
    dots:true,
    dotsClass: 'slick-dots',
    autoplay: true,
    autoplaySpeed: 10000
});

function resize(){
    $('.carousel').height($("#main").height() - 45);
    $('#twitter-live').attr('height', $("#main").height());
    $('#twitter-live').attr('width', $("#main").width() - 700);

}

window.onload = start();

function start() {
    var date = new Date();
    var minutes = date.getMinutes();
    if (parseInt(minutes) < 10){
        minutes = "0" + minutes;
    }
    document.getElementById("points-update-time").innerHTML = "August " + date.getDate() + " 2016 at " + date.getHours() + " : " + minutes;
    document.getElementById("date").innerHTML = "August " + date.getDate() + " 2016";
    document.getElementById("time").innerHTML =  date.getHours() + " : " + minutes;
    getEvents();
    resize();
    getPoints();
}

function getPoints()
{
    setTimeout(function(){

        var date = new Date();
        var minutes = date.getMinutes();
        if (parseInt(minutes) < 10){
            minutes = "0" + minutes;
        }
        document.getElementById("points-update-time").innerHTML = "August " + date.getDate() + " 2016 at " + date.getHours() + " : " + minutes;
        document.getElementById("time").innerHTML =  date.getHours() + " : " + minutes;

        $.ajax({
            url: 'https://cityouth-conference.herokuapp.com/points',
            type: 'GET',
            success: function (data) {
                document.getElementById("points1").innerHTML = data.water;
                document.getElementById("points2").innerHTML = data.steel;
                document.getElementById("points3").innerHTML = data.fire;
                document.getElementById("points4").innerHTML = data.dragon;
            }
        });
        getPoints();
    }, 1000);

}

function getEvents() {
    setTimeout(function(){
        var date = new Date();
        var index = date.getDate() - 24;
        var time = parseInt(String(date.getHours()) + date.getMinutes());
        var current_event;
        var next_event;
        var next_start;

        for (var x = 0; x < schedule[index].length; x++) {
            if (typeof schedule[index][x+1] !== 'undefined' && parseInt(time) >= parseInt(schedule[index][x+1][0])) {
                continue;
            } else {
                current_event = schedule[index][x][1];
                if (typeof schedule[index][x+1] === 'undefined') {
                    next_event = schedule[index+1][0][1];
                    next_start = schedule[index+1][1][0]
                } else {
                    next_event = schedule[index][x+1][1];
                    next_start = schedule[index][x+1][0];
                }
                break;
            }
        }
        document.getElementById("this-event").innerHTML = current_event;
        document.getElementById("next-event").innerHTML = next_event;
        document.getElementById("next-start").innerHTML = "Starting at " + next_start.substring(0, next_start.length-2) + " : " + next_start.slice(-2);
        getEvents();
    }, 5000);
}
