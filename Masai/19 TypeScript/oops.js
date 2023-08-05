var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Sunday"] = "Sun";
    DayOfWeek["Monday"] = "Mon";
    DayOfWeek["Tuesday"] = "Tue";
    DayOfWeek["Wednesday"] = "Wed";
    DayOfWeek["Thursday"] = "Thu";
    DayOfWeek["Friday"] = "Fri";
    DayOfWeek["Saturday"] = "Sat";
})(DayOfWeek || (DayOfWeek = {}));
var day = DayOfWeek.Wednesday;
console.log(day); // Output: "Wed"
