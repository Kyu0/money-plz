/*
    @ exchange-rate API: https://www.exchangerate-api.com/docs/overview
*/

const schedule = require('node-schedule')
const axios = require('axios')

const API_URI = `https://v6.exchangerate-api.com/v6/${process.env.OPEN_API_KEY}/`

let countries = null;
let exchangeRates = null;

const getCountries = async () => {
    countries = await axios.get(API_URI + 'codes')
        .then((response) => {
            return response.data.supported_codes
                .map((arr) => {
                    return { 'unit': arr[0], 'name': arr[1] }
                })
        })
}

const getExchangeRate = (countryInitial) => {
    exchangeRates = {};
    axios.get(API_URI + `latest/${countryInitial}`)
        .then(response => response.data.conversion_rates)
        .then(rate => {
            exchangeRates[countryInitial] = rate
        })
}

exports.getDataByApi = async () => {
    console.log('Updating International Exchange Rate Data...')
    countries = null;
    exchangeRates = null;

    await getCountries()

    for (let country of countries) {
        getExchangeRate(country['unit'])
    }

    console.log('Update Done. But, \'exchageRates\' variable may be updating...')
}

schedule.scheduleJob('0 0 0 * * *', async () => { // 매일 0시 마다 실행
    await this.getDataByApi()
})

// TODO: 국가 이름 한글로도 제공하기
exports.getCountryInitial = () => {
    if (countries == null)
        throw new Error('국가 정보를 업데이트 하고 있습니다. 잠시 후 다시 시도해주세요.')

    return countries
}

exports.getCountryExchangeRate = (countryInitial) => {
    if (exchangeRates == null) 
        throw new Error('환율 정보를 업데이트 하고 있습니다. 잠시 후 다시 시도해주세요.')

    return exchangeRates[countryInitial];
}