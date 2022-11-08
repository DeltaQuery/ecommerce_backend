const axios = require('axios')
const cheerio = require('cheerio')

export const getBcvRate = async () => {
    const url = `http://www.bcv.org.ve/`
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const rate = $('div#dolar > div > div:last-child strong').text()
        const date = $('div.pull-right > span.date-display-single').text()

        console.log(`Tasa oficial Bs./USD: ${rate} en fecha: ${date}`)
        return { rate, date }
    } catch (e) {
        console.error(`Error al tratar de obtener tasa de cambio actualizada.`)
    }
}