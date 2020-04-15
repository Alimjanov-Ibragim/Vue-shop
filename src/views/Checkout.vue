<template>
  <div class="checkout">
    <NavBar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-8">
          <h4 class="py-4">Checkout page</h4>

          <ul>
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
          <!-- <h4 v-else class="empty">Empty</h4> -->
        </div>
        <div class="col-md-4">
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
import axios from "axios";
/* eslint-disable */
var stripe = Stripe("pk_test_dZPt55jzCpk7MkzrABlt3lIL00Wag2tHr5");

export default {
  data() {
    return {
      complete: true,
      stripeOptions: null,
      sessionId: ""
    };
  },
  components: {
    NavBar
  },
  methods: {
    pay() {
      let data = this.$store.state.cart.map(item => ({
        [item.product_id]: item.productQuantity
      }));
      data = Object.assign({}, ...data);
      console.log(data);

      axios
        .get(
          // https://us-central1-vue-shop-36f0f.cloudfunctions.net/CheckoutSession
          "http://localhost:5000/vue-shop-36f0f/us-central1/CheckoutSession",
          {
            params: {
              products: data
            }
          }
        )
        .then(response => {
          this.sessionId = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      // stripe
      //   .redirectToCheckout({
      //     // Make the id field from the Checkout Session creation API response
      //     // available to this file, so you can provide it as parameter here
      //     // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      //     sessionId: this.sessionId.id
      //   })
      //   .then(function(result) {
      //     // If `redirectToCheckout` fails due to a browser or network
      //     // error, display the localized error message to your customer
      //     // using `result.error.message`.
      //     console.log(result);
      //   });
    }
  },
  created() {}
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
