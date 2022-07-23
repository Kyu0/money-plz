/*
    @ exchange-rate API: https://www.exchangerate-api.com/docs/overview
*/

const schedule = require('node-schedule')
const axios = require('axios')
const fs = require('fs')

const API_URI = `https://v6.exchangerate-api.com/v6/${process.env.OPEN_API_KEY}/`

let countries = null;
let exchangeRates = null;


// const getCountriesFromFile = () => {
//     countries = null;
//     const jsonFile = JSON.parse(fs.readFileSync('supported_codes.json', 'utf-8'))
    
//     temp = [];
//     for (let [key, value] of Object.entries(jsonFile)) {
//         temp.push({'unit': key, 'name': value})
//     }
    
//     countries = temp
// }

// const getExchangeRateFromFile = (countryInitial) => {
//     exchangeRates = null;

//     let temp = {}
//     let tempExchangeRate = {}

//     for (let [key, value] of Object.entries(countries)) {
//         tempExchangeRate[value['unit']] = 1
//     }

//     for (let country of countries) {
//         temp[country['unit']] = tempExchangeRate
//     }
    
//     exchangeRates = temp
// }

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

// exports.getDataByFile = async () => {
//     console.log('Updating International Exchange Rate Data...')
//     countries = null;
//     exchangeRates = null;

//     getCountriesFromFile();
//     getExchangeRateFromFile();

//     console.log('Update Done.')
// }

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
    // this.getDataByFile()
})

// TODO: 국가 이름 한글로도 제공하기
exports.getCountryInitial = () => {
    if (countries == null)
        throw new Error('국가 정보를 업데이트 하고 있습니다. 잠시 후 다시 시도해주세요.')

    return countries
}

exports.getCountryExchangeRate = (countryInitial) => {
    if (exchangeRates[countryInitial] == null) 
        throw new Error('환율 정보를 업데이트 하고 있습니다. 잠시 후 다시 시도해주세요.')

    return exchangeRates[countryInitial];
}