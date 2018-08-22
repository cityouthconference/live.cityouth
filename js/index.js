// if doesnt exist, then we say it is Free Time
var schedule =
    [[["0", "Travel to 671 Sheppard E"],
        ["1730", "Registration"],
        ["1800", "Dinner"],
        ["1830", "Tribe Bonding Activities"],
        ["2000", "Worship"],
        ["2030", "Message 1"],
        ["2100", "Small Group"],
        ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "Breakfast"],
            ["1030", "Announce Tribes"],
            ["1100", "Stage Games"],
            ["1130", "Worship"],
            ["1200", "Lunch"],
            ["1245", "Points"],
            ["1400", "Activity: Slip & Slide"],
            ["1500", "Break"],
            ["1530", "Activity: Water Balloon Capture the Flag"],
            ["1630", "Break"],
            ["1645", "Small Group"]
            ["1700", "Worship"],
            ["1730", "Message 2"],
            ["1800", "Small Group"],
            ["1830", "Dinner"],
            ["1900", "Laser Tag Introduction"],
            ["1930", "Activity: Laser Tag & HHH"],
            ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "Team Huddle"],
            ["1000", "Small Group"],
            ["1015", "Worship"],
            ["1045", "Message 3"],
            ["1115", "Small Group"],
            ["1145", "Points"],
            ["1200", "Lunch"],
            ["1245", "Break"],
            ["1300", "Explain Activity"],
            ["1315", "Activity: Running Man"],
            ["1445", "Cool Down"],
            ["1515", "Talk About Outreach"],
            ["1600", "Outreach & Activites"],
            ["2130", "Go Home!"]],

        [["0", "Arrive at 671 Sheppard Ave E"],
            ["930", "Team Huddle"],
            ["1000", "Outreach Debrief"],
            ["1030", "Small Group"],
            ["1045", "Worship"],
            ["1115", "Message 4"],
            ["1145", "Small Group"],
            ["1215", "Lunch with Community Groups"],
            ["1430", "Activity: Water Balloon Capture the Flag"],
            ["1600", "Break"],
            ["1815", "Dinner"],
            ["1900", "Stage Games"],
            ["1930", "Worship"],
            ["2000", "Message 5"],
            ["2100", "Worship"],
            ["100000", "See you next year!"]]];

var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

$('.carousel').slick({
    dots: true,
    dotsClass: 'slick-dots',
    autoplay: true,
    autoplaySpeed: 10000
});

window.onload = start();

function start() {
    resize();
    setClock();
    getPoints();
    getEvents();
    poll();
}

function resize() {
    $('.carousel').height($("#main").height() - 45);
    $('#twitter-live').attr('height', $("#main").height());
    $('#twitter-live').attr('width', $("#main").width() - 700);
}

function setClock() {
    var date = new Date();
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var hours = parseHours(date.getHours());
    var minutes = parseMinutes(date.getMinutes());
    document.getElementById("points-update-time").innerHTML = `${month} ${day} ${year} at ${hours} : ${minutes}`;
    document.getElementById("date").innerHTML = `${month} ${day}, ${year}`
    document.getElementById("time").innerHTML = `${hours} : ${minutes}`
}

function getPoints() {
    $.ajax({
        url: 'https://cityouth-conference.herokuapp.com/points',
        type: 'GET',
        success: function (data) {
            Object.keys(data).forEach((key, i) => {
                document.getElementById(`name${i+1}`).innerHTML = key;
                document.getElementById(`point${i+1}`).innerHTML = data[key];
            })
        }
    });
}

function getEvents() {
    var date = new Date();
    var time = parseInt(String(date.getHours()) + date.getMinutes());
    var index = date.getDate() - 22;
    var current_event = "";
    var next_event = "";
    var next_start;

    if (schedule[index]) {
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
    }
}

function poll() {
    setTimeout(function() {
        setClock();
        getPoints()
        getEvents();
        poll();
    }, 300000);
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
