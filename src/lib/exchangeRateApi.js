/*
    @ exchange-rate API: https://www.exchangerate-api.com/docs/overview

*/
const axios = require('axios')

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