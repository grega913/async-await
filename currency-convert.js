//USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries.

const axios = require('axios')
/*
const getExchangeRate = (from, to)=> {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    })
}
*/
//make function from above asynx
const getExchangeRate = async (from, to)=> {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`)
        const rate = response.data.rates[to];

        if (rate) {
            return rate
        } else {
            throw new Error()
        }
    } catch(e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
    }
}

/*
const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=> {
        return response.data.map((country) => country.name)
        })
}
*/

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => country.name)
    } catch(e) {
        throw new Error (`Unable to get countries that use ${currencyCode}`)
    }

}


/*
const convertCurrency = (from, to, amount) => {
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries
        return getExchangeRate(from, to)
    }).then((rate)=> {
        const exhcangedAmount = amount * rate

        return `${amount} ${from} is worth ${exhcangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')} `
    })
}
*/

//Create convertCurrencyAlt as async function
//Get countries and rate using await and our two functions
//Calculate exchangedAmount
//Return status string
const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to)
    const exchangeRate = await getExchangeRate(from, to)
    const exchangedAmount = amount * exchangeRate
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')} `
}


convertCurrencyAlt('USD','EUR', 100).then((status) => {
    console.log(status)
}).catch((e)=> {
    console.log(e)
})

/*
getExchangeRate('USD','EUR').then((rate)=> {
    console.log(rate)
})

getCountries('CAD').then((countries) => {
    console.log(countries)
})
*/
