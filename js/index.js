// if doesnt exist, then we say it is Free Time
var schedule =
    [[["0", "Travel to 671 Sheppard E"],
        ["1700", "Registration"],
        ["1800", "Dinner"],
        ["1830", "Tribe Bonding Activities"],
        ["2000", "Worship"],
        ["2030", "Message 1"],
        ["2100", "Small Group"],
        ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["1000", "Team Meet / Chill"],
            ["1030", "Small Group"],
            ["1100", "Worship"],
            ["1130", "Message 2"],
            ["1200", "Small Group"],
            ["1230", "Lunch"],
            ["1315", "Points"],
            ["1330", "Quiet Time"],
            ["1400", "Activity: Running Man"],
            ["1600", "Small Group"],
            ["1630", "Worship"],
            ["1700", "Message 3"],
            ["1730", "Small Group"],
            ["1800", "Dinner"],
            ["1830", "Laser Tag: Introduction"],
            ["1900", "Activity: Laser Tag"],
            ["2100", "Laser Tag: buffer Time"],
            ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "Breakfast"],
            ["1030", "Team Meet / Chill"],
            ["1100", "Worship"],
            ["1130", "Small Group"],
            ["1200", "Quiet Time"],
            ["1230", "Lunch"],
            ["1315", "Points"],
            ["1330", "Travel to Amanda's!"],
            ["1800", "Dinner"],
            ["1900", "Worship"],
            ["1930", "Message 4"],
            ["2000", "Small Group"],
            ["2030", "Bonfire"],
            ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["1000", "Team Meet / Chill"],
            ["1030", "Worship"],
            ["1100", "Small Group"],
            ["1145", "Travel"],
            ["1200", "Lunch with Community Groups"],
            ["1330", "Travel"],
            ["1345", "Break"],
            ["1400", "Outreach"],
            ["1530", "Break"],
            ["1600", "Activity"],
            ["1730", "Break"],
            ["1815", "Dinner"],
            ["1900", "Stage Games"],
            ["1930", "Worship"],
            ["2000", "Message 5"],
            ["2100", "Worship"],
            ["100000", "See you next year!"]]];

var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

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
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var hours = parseHours(date.getHours());
    var minutes = parseMinutes(date.getMinutes());
    document.getElementById("points-update-time").innerHTML = `${month} ${day} ${year} at ${hours} : ${minutes}`;
    document.getElementById("date").innerHTML = `${month} ${day}, ${year}`
    document.getElementById("time").innerHTML = `${hours} : ${minutes}`
    getEvents();
    resize();
    getPoints();
}

function getPoints()
{
    setTimeout(function(){
        var date = new Date();
        var year = date.getFullYear();
        var month = monthNames[date.getMonth()];
        var day = date.getDate();
        var hours = parseHours(date.getHours());
        var minutes = parseMinutes(date.getMinutes());
        document.getElementById("points-update-time").innerHTML = `${month} ${date} ${year} at ${hours} : ${minutes}`;
        document.getElementById("time").innerHTML = `${hours} : ${minutes}`

        $.ajax({
            url: 'https://cityouth-conference.herokuapp.com/points',
            type: 'GET',
            success: function (data) {
                console.log(data);
                Object.keys(data).forEach((key, i) => {
                    document.getElementById(`points${i+1}`).innerHTML = data[key];
                })
            }
        });
        getPoints();
    }, 300000);

}

function getEvents() {
    setTimeout(function(){
        var date = new Date();
        var index = date.getDate() - 23;
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
        document.getElementById("next-start").innerHTML = "Starting at " + parse24hrDateString(next_start);
        getEvents();
    }, 5000);
}

/*
 * Returns: a string representation of the time in standard representation (ie. 12:12 PM)
 */
function parse24hrDateString(time) {
    var int_time = parseInt(time);
    var hr = parseHour(int_time/100);
    return " " +  hr + ":" + ("0" + (int_time%100)).slice(-2) + ((int_time >= 1200) ? " PM" : " AM");
}

function parseHours(hours) {
    switch(hours) {
        case 0:
            hours = 12;
            break;
        case 12:
            break;
        default:
            hours = hours % 12;
    }
    return hours;
}

function parseMinutes(minutes) {
  if (parseInt(minutes) < 10){
      minutes = "0" + minutes;
  }
  return minutes
}
