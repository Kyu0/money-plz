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
    try {
        countries = await axios.get(API_URI + 'codes')
        .then((response) => {
            return response.data.supported_codes
            .map((arr) => {
                return { 'unit': arr[0], 'name': arr[1] }
            })
        })
    }
    catch (e) {
        console.log('Error Occured', e)
    }
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

    try {
        await getCountries()
    }
    catch (e) {
        console.log('Error Occured', e)
    }

    for (let country of countries) {
        getExchangeRate(country['unit'])
    }

    console.log('Update Done. But, \'exchageRates\' variable may be updating...')
}

schedule.scheduleJob('0 0 0 * * *', async () => { // ?????? 0??? ?????? ??????
    try{
        await this.getDataByApi()
    }
    catch (e) {
        console.log('Error Occured', e)
    }
    // this.getDataByFile()
})

// TODO: ?????? ?????? ???????????? ????????????
exports.getCountryInitial = () => {
    if (countries == null)
        throw new Error('?????? ????????? ???????????? ?????? ????????????. ?????? ??? ?????? ??????????????????.')

    return countries
}

exports.getCountryExchangeRate = (countryInitial) => {
    if (exchangeRates[countryInitial] == null) 
        throw new Error('?????? ????????? ???????????? ?????? ????????????. ?????? ??? ?????? ??????????????????.')

    return exchangeRates[countryInitial];
}