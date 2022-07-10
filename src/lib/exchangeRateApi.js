/*
    @ exchange-rate API: https://www.exchangerate-api.com/docs/overview
    TODO: 하루에 한 번만 조회해서 API 호출 횟수 줄이기
*/
const axios = require('axios')
const fs = require('fs')

const API_URI = `https://v6.exchangerate-api.com/v6/${process.env.OPEN_API_KEY}/`

// TODO: 국가 이름 한글로도 제공하기
exports.getCountryInitial = axios.get(API_URI + 'codes')
    .then((response) => {
        return response.data.supported_codes
            .map((arr) => {
                return { 'unit': arr[0], 'name': arr[1] }
            })
    })
    .catch((error) => {
        console.log(error)
    })

exports.getCountryExchangeRate = (countryInitial) => {
    if (countryInitial !== 'KRW') countryInitial = 'USD'
    const result = fs.readFileSync(`${__dirname}/${countryInitial}_dummy.json`, 'utf8')
    return JSON.parse(result).conversion_rates
    // return axios.get(API_URI + `latest/${countryInitial}`)
    //     .then(response => response.data.conversion_rates)
}