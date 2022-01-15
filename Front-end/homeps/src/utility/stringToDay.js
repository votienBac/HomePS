const stringToWeekDays = (str) => {
    let output = '';
    if(str == null){
        return output;
    }
    else{
    if(str[0] === '1'){
        output += 'Thứ hai, '
    }
    if(str[1] === '1'){
        output += 'Thứ ba, '
    }
    if(str[2] === '1'){
        output += 'Thứ tư, '
    }
    if(str[3] === '1'){
        output += 'Thứ năm, '
    }
    if(str[4] === '1'){
        output += 'Thứ sáu, '
    }
    if(str[5] === '1'){
        output += 'Thứ bảy, '
    }
    if(str[6] === '1'){
        output += 'Chủ nhật, '
    }
    }
    return output.substring(0, output.length - 2)
}
export default stringToWeekDays