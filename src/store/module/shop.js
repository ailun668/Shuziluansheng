import { defineStore } from "pinia";
export default defineStore("shop", {
  state: () => {
    return {
      shopList: ["a", "b", "c"],
    };
  },
  actions: {
    changeShopList() {
      this.$state.shopList = ["a", "b", "c"];
    },
  },
});
