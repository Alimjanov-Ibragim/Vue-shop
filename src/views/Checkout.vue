<template>
  <div class="checkout">
    <NavBar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-8">
          <h4 class="py-4">Checkout page</h4>

          <ul v-if="this.$store.state.cart.lenght">
            <li
              v-for="(item, index) in this.$store.state.cart"
              class="media mb-4"
              :key="index"
            >
              <img
                :src="item.product_image"
                width="80px"
                class="align-self-center mr-3"
                alt=""
              />
              <div class="media-body">
                <h5 class="mt-0">
                  {{ item.productName }}
                </h5>
                <p class="mt-0">
                  {{
                    item.productPrice
                      | currency("$", 0, { symbolOnLeft: false })
                  }}
                </p>
                <p class="m-0">Quantity : {{ item.productQuantity }}</p>
                <span
                  class="remove"
                  @click="$store.commit('removeFromCart', item)"
                  >Remove</span
                >
              </div>
            </li>
          </ul>
          <h4 v-else class="empty">Empty</h4>
        </div>
        <div class="col-md-5">
          <p>Total Price : {{ this.$store.getters.totalPrice | currency }}</p>

          <!-- <card
            class="stripe-card"
            :class="{ complete }"
            stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
            :options="stripeOptions"
            @change="complete = $event.complete"
          /> -->

          <button
            class="pay-with-stripe btn btn-primary mt-4"
            @click="pay"
            :disabled="!complete"
          >
            Pay with credit card
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      complete: null,
      stripeOptions: null
    };
  },
  components: {
    NavBar
  },
  methods: {
    pay() {}
  }
};
</script>

<style scoped>
.checkout {
  text-align: left;
}
.remove {
  cursor: pointer;
  color: #f00;
}
</style>
