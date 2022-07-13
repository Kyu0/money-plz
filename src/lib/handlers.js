const exchangeRateApi = require('./exchangeRateApi')

exports.index = (req, res) => {
    res.render('index', { 'countryInitial': exchangeRateApi.getCountryInitial })
}

exports.api = {
    exchange: (req, res) => {
        const koreaMoney = req.query.koreaMoney
        const destUnit = req.query.destUnit
        
        const koreaRates = exchangeRateApi.getCountryExchangeRate('KRW')
        const destRates = exchangeRateApi.getCountryExchangeRate(destUnit)

        for (key in koreaRates) {
            koreaRates[key] = (koreaMoney * koreaRates[key] / destRates[key]).toFixed(2)
        }

        let results = Object.entries(koreaRates).sort((a, b) => b[1] - a[1]).slice(0, 3)
        
        res.json({
            success: true,
            results: results,
            directExchangeResult: (koreaMoney / destRates['KRW']).toFixed(2)
        })
    }
}