import axios from 'axios'

const axiosRoute = () => {
  return axios.create({
    baseURL: 'https://gosavemore.herokuapp.com/',
  })
}

export default axiosRoute
