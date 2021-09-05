module.exports = {
    toLowerKeys: obj => {
        let json = JSON.stringify(obj);
        let newJson = json.replace(/"([\w]+)":/g, ($0, $1) => {
            return ('"' + $1.toLowerCase() + '":');
        });
        var newObj = JSON.parse(newJson);
        return newObj;
    }
}