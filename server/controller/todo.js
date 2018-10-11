const errorCode = require('../config/errorCode')
const baseList = [
  { id: 1000, cnt: '初始item 1', status: 0 },
  { id: 1001, cnt: '初始item 2', status: 0 },
  { id: 1002, cnt: '初始item 3', status: 0 },
  { id: 1003, cnt: '初始item 4', status: 0 },
  { id: 1004, cnt: '初始item 5', status: 1 },
]
const todo = {
  async list(ctx) {
    ctx.body = {
      err: 0,
      list: baseList
    }
  },
  async add(ctx) {
    const { cnt } = ctx.request.body
    if (cnt) {
      const len = baseList.length
      baseList.push({ id: 1000 + len, cnt, status: 0 })
      ctx.body = { err: 0 }
    }
    else {
      ctx.body = errorCode[0]
    }
  },
  async update(ctx) {
    const { id, cnt, status } = ctx.request.body
    if (id && cnt && status) {
      baseList.map(item => {
        if (item.id === JSON.parse(id)) {
          item.cnt = cnt
          item.status = status
        }
      })
      ctx.body = { err: 0 }
    }
    else {
      ctx.body = errorCode[0]
    }
  },
  async delete(ctx) {
    const { id } = ctx.request.body
    if (id) {
      baseList.map((item, index) => {
        if (item.id === JSON.parse(id)) {
          baseList.splice(index, 1)
        }
      })
      ctx.body = { err: 0 }
    }
    else {
      ctx.body = errorCode[0]
    }
  }
}

module.exports = todo