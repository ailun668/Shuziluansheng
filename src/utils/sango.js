// import { testStore } from '../store/testStore'
// const store = testStore()
export default {
  install: (app, options) => {
    // app.mixins([install])
    app.mixin({
      data() {
        return {}
      },
      methods: {},
      watch: {},
      mounted() {
        // alert(111)
      },
    })
  },
  methods: {},
  data() {},
}
