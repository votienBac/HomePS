const formatMoney =(str) => {
    str = Number(str)
    str = new Intl.NumberFormat().format(str)
    return str
}
export default formatMoney