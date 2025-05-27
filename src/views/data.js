var name = 'Mark'
let data2 = [
  {
    code: 234,
    msg: 'success',
    count: 1,
  },
  {
    code: 666,
    msg: 'success',
    count: 1,
  },
  {
    code: 239,
    msg: 'success',
    count: 1,
  },
  {
    code: 200,
    msg: 'success',
  },
]
// export { data2 };
class Animal {
  constructor(name, age, { ...parts }) {
    this.name = name
    this.age = age
    this.parts = parts
  }
  genome() {
    return this.name
  }
}

export { name, data2, Animal }
