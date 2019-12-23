import Mock from 'mockjs'
import LoginApi from './login'

Mock.mock('/user/login', 'post', LoginApi.loginByUsername)
Mock.mock('/user/userInfo', 'get', LoginApi.getUserInfo)
Mock.mock('/user/menu', 'get', LoginApi.getMenu)

export default Mock
