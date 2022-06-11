const axios = require(`axios`)

const handler = async (event) => {
 const {lat, lon} = event.queryStringParameters

 const API_KEY = process.env.API_KEY
 const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&query=${lat},${lon}&days=3`

 try {
    const { data } = await axios.get(url)

    return {
      statusCode:  200,
      body: JSON.stringify(data)
    }

 } catch (error) {
  const { statusCode, statusText, headers, data } = error.response
  return {
    statusCode: statusBar,
    body: JSON.stringify({statusCode, statusText, headers, data})
  }
 }
}

module.exports = { handler }
