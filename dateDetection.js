function getCurrentDateStatus(currentTime, currentDate, startTime, startDate, endTime, endDate){
    /// Return type: int
    /// -2 : Wrong data type for date
    /// -1 : Wrong data type for time
    ///  0 : Event has not started yet
    ///  1 : Event is ongoing
    ///  2 : Event has ended
    if (typeof(currentTime) != "string" || typeof(startTime) != "string" || typeof(endTime) != "string"){
        console.log("error: time input is not a string");
        return -1;
    }

    if (typeof(currentDate) != "object" || typeof(startDate) != "object" || typeof(endDate) != "object"){
        console.log("error: date input is not an object");
        return -2;
    }

    // check for year
    if (currentDate.getFullYear() < startTime.getFullYear()){
        return 0;
    }
    if (currentDate.getFullYear() > endTime.getFullYear()){
        return 2;
    }

    // check for month
    if (currentDate.getMonth() < startTime.getMonth()){
        return 0;
    }
    if (currentDate.getMonth() > endTime.getMonth()){
        return 2;
    }

    // check for date
    if (currentDate.getDate() < startTime.getDate()){
        return 0;
    }
    if (currentDate.getDate() > endTime.getDate()){
        return 2;
    }

    // check for time
    // [0] : hour
    // [1] : minute
    let currentTimeArr = currentTime.split(":");
    let startTimeArr = startTime.split(":");
    let endTimeArr = endTime.split(":");

    currentTimeArr[0] = parseInt(currentTimeArr[0]);
    currentTimeArr[1] = parseInt(currentTimeArr[1]);

    startTimeArr[0] = parseInt(startTimeArr[0]);
    startTimeArr[1] = parseInt(startTimeArr[1]);

    endTimeArr[0] = parseInt(endTimeArr[0]);
    endTimeArr[1] = parseInt(endTimeArr[1]);

    if (currentTimeArr[0] < startTimeArr[0]){
        return 0;
    }
    if (currentTimeArr[0] > endTimeArr[0]){
        return 2;
    }

    if (currentTimeArr[1] < startTimeArr[1]){
        return 0;
    }
    if (currentTimeArr[1] > endTimeArr[1]){
        return 2;
    }

    return 1;
}