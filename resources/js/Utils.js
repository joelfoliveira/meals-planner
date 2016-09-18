define(function() {

    var shuffleArray = function(a){
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    };

    var getDayOfTheWeekName = function(dayIndex){
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[dayIndex];
    };

    var outputDateAsYYYYMMDD = function(date, separator){
        var s = separator || '/';
        return date.getUTCFullYear().toString() + s +(date.getUTCMonth() + 1).toString() + s + date.getUTCDate();
    };

    return {
        shuffleArray: shuffleArray,
        getDayOfTheWeekName: getDayOfTheWeekName,
        outputDateAsYYYYMMDD: outputDateAsYYYYMMDD
    };
});