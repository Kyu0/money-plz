const exchange = require('./exchange')

exports.exchange = (req, res) => {
    const koreaMoney = req.query.koreaMoney
    const destUnit = req.query.destUnit

    res.send(exchange.calculate(koreaMoney, destUnit))
}