const formatTime = (str) =>{
    let newDate = new Date(str)
    let dd = newDate.getDate();
    if(dd <10) dd = '0' + dd;

    let mm = newDate.getMonth() + 1;
    if(mm < 10) mm = '0' + mm;  

    let hh = newDate.getHours();
    if(hh < 10) hh = '0' + hh;
    
    let minute = newDate.getMinutes();
    if(minute < 10) minute = '0' + minute;

    let res =   hh + ':' + minute + ' ' + dd + '-' + mm + '-' + newDate.getFullYear();
    return res
}
export default formatTime