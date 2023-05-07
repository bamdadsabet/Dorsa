//axios configuration
import Axios from 'axios'
const instance  =  Axios.create({
baseURL: 'https://kodoumo.ir/wp-json/api/v2/reviews-category/animations/',
responseType: 'json',
timeout: 50000
})
const axios = instance;
export { axios }