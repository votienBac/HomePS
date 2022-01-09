const formatTime = (str) =>{
    let newDate = new Date(str)
    let res = newDate.getDate() + '-' + (newDate.getMonth()+1) + '-' + newDate.getFullYear() + ' '
            + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
    return res
}
export default formatTime