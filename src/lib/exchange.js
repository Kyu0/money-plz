const exim = require('./exim')

const results = exim.results

exports.calculate = (koreaMoney, destUnit) => {
    const [destination] = results.filter(result => result.cur_unit === destUnit)
    
    return (parseFloat(koreaMoney) / destination.tts) + destination.cur_unit
}