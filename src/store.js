import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let cart = window.localStorage.getItem("cart");

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    hideModal: true
  },
  getters: {
    totalPrice: state => {
      var sum = 0;
      for (var i = 0; i < state.cart.length; i++) {
        sum += parseFloat(state.cart[i].productPrice);
      }
      return sum;
    }
  },
  mutations: {
    addToCart(state, item) {
      let found = state.cart.find(prod => prod.product_id == item.product_id);
      if (found) {
        found.productQuantity++;
      } else {
        state.cart.push(item);
      }
      this.commit("saveData");
    },
    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      this.commit("saveData");
    },
    hideModal(state, payload) {
      state.hideModal = payload;
      if (payload) {
        /* eslint-disable */
        $(".modal").modal("hide");
      }
    }
  }
});
