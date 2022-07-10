const exchangeRateApi = require('./exchangeRateApi')

exports.index = (req, res) => {
    exchangeRateApi.getCountryInitial
        .then( countryIntial => {
            res.render('index', { 'countryInitial': countryIntial })
        })
}

exports.api = {
    exchange: (req, res) => {
        const koreaMoney = req.query.koreaMoney
        const destUnit = req.query.destUnit
    
        res.json({ok: true, exchanged : exchange.calculate(koreaMoney, destUnit)})
    }
}