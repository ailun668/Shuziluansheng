// export default class MyClass {
//   constructor() {
//     this.name = '张三';
//   }
//   sayHello () {
//     console.log(`hello ${this.name}`);
//   }
// }

//导出一个类对象
export default class {
  constructor(name, age) {
    this.name = '张三'
    this.age = age
  }
  sayHello() {
    console.log(`hello ${this.name}`)
    console.log(this.age, '=====KKK')
  }
}
