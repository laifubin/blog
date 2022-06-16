import Mock from 'mockjs'
import table from './data/table'

Mock.mock('/api/table/getList', 'post', table.getList)
Mock.mock('/api/table/update', 'post', table.update)
Mock.mock('/api/table/delete', 'post', table.delete)
Mock.mock('/api/test/index', 'get', table._test)
Mock.mock('/api/login', 'post', table._login)

export default Mock