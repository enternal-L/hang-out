function getCurrentDateStatus(startDate, endDate){
    /// Return type: int
    /// -2 : Wrong data type for date
    /// -1 : Wrong data type for time
    ///  0 : Event has not started yet
    ///  1 : Event is ongoing
    ///  2 : Event has ended

    const currentDate = new Date();
    //there's local get and UTC get (utc get will have to account for timezone differences)

    if (typeof(startDate) != "object" || typeof(endDate) != "object"){
        console.log("error: date input is not an object");
        return -2;
    }

    // check for year
    if (currentDate.getFullYear() < startDate.getFullYear()){
        return 0;
    }
    if (currentDate.getFullYear() > endDate.getFullYear()){
        return 2;
    }

    // check for month
    if (currentDate.getMonth() < startDate.getMonth()){
        return 0;
    }
    if (currentDate.getMonth() > endDate.getMonth()){
        return 2;
    }

    // check for date
    if (currentDate.getDate() < startDate.getDate()){
        return 0;
    }
    if (currentDate.getDate() > endDate.getDate()){
        return 2;
    }

    // check for time
    // [0] : hour
    // [1] : minute
    let currentTimeArr = [currentDate.getHours(), currentDate.getMinutes()];
    let startTimeArr = [startDate.getHours(), startDate.getMinutes()];
    let endTimeArr = [endDate.getHours(), endDate.getMinutes()];

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