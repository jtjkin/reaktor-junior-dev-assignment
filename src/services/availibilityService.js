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

//some logical error still exists. interceptor return undefined
//if data fetched succesfully through retryApi
//can't figure out why. 

const manufacturerApi = axios.create(config)

manufacturerApi.interceptors.response.use(
    async res => {
        if (res?.data?.response.length > 10) {
            return res.data.response
        }

        if (res === undefined || res?.data?.response === '[]') {
            await retryApi()  
        }
    },
    async err => {
        console.log('fetch failed', err)
        await retryApi()
    }
)


const retryApi = async () => { 
    try {
        const response = await manufacturerApi.request({
            method: 'get',
            url: `${proxyUrl}${baseUrl}availability/${saveName}`
        })
        return response
    } catch (error) {
        console.log(error.response)
    }
    

}

const fetchManufacturer = async ({manufacturer}) => {
    saveName = manufacturer

    try {

        const response = await manufacturerApi.request({
            method: 'get',
            url: `${proxyUrl}${baseUrl}availability/${manufacturer}`
        })
        return response
    } catch (error) {
        console.log(error.response)
    }
}

const response = {
    fetchManufacturer
}

export default response