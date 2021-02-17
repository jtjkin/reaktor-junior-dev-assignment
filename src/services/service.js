import axios from 'axios'

const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/' //DEV
//const proxyUrl = ''

let saveName = ''

const config = {
    headers: {
        //'x-force-error-mode': 'all',
    }
}

const serviceApi = axios.create(config)

serviceApi.interceptors.response.use(
    res => res,
    async err => {
        console.log('fetch failed', err)
        await retryApi()
        throw new Error('failed')
    }
)


const retryApi = async () => {   
    try {
        const response = await serviceApi.request({
            method: 'get',
            url: `${proxyUrl}${baseUrl}products/${saveName}`
        })

        return response.data
    } catch (error) {
        console.log(error.response)
    }
}

const fetchCategory = async ({category}) => {
    saveName = category

    try {
        const response = await serviceApi.request({
            method: 'get',
            url: `${proxyUrl}${baseUrl}products/${category}`
        })

        return response.data
    } catch (error) {
        console.log(error.response)
    }
}

const response = {
    fetchCategory
}

export default response