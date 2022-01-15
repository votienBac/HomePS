const formatMoney =(str) => {
    str = Number(str)
    str = new Intl.NumberFormat().format(str)
    return str + ' vnđ'
}
export default formatMoney