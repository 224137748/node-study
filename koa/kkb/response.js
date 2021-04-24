module.exports = {
  get body() {
    return this._body
  },
  set body(val) {

    // 根据val的数据类型定义response的content-type
    if (typeof val === 'object') {
      this.res.setHeader('Content-Type','app;ication/json;')
    } else if (typeof val === 'string') {
      this.res.setHeader('Content-Type', 'text/plain;charset=utf-8;')
    }
    this._body =val

  }
}