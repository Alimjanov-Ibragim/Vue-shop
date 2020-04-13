<template>
  <div class="AddToCart">
    <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "AddToCart",
  props: {
    name: String,
    price: String,
    productImage: String,
    productId: String
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        product_image: this.productImage,
        product_id: this.productId,
        productQuantity: 1
      }
    };
  },
  methods: {
    addToCart() {
      $("#miniCart").modal("show");
      this.$store.commit("addToCart", this.item);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
