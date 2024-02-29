const jsonParse = (x) => {
    return(JSON.parse(localStorage.getItem(x)) || []);
}
export default jsonParse;