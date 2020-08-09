// 错误处理中间件
module.exports = () => {
  return (err, req, res, next) => {
    // 要添加多一个状态码，要不然，前端的响应拦截器，没有获取到这个 状态码，会报错
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  }
}