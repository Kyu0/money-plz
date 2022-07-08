const exim = require('./exim')

const results = exim.results

exports.calculate = (koreaMoney, destUnit) => {
    const [destination] = results.filter(result => result.cur_unit === destUnit)
    return (parseInt(koreaMoney) / destination.tts).toFixed(4) + ' ' + destination.cur_unit
}