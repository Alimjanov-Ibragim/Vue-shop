<template>
  <div class="products-list" id="products-list">
    <div class="container">
      <h1 class="text-center p-5">Our Products list</h1>
      <div class="row">
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card product-item h-100">
            <carousel :per-page="1">
              <slide v-for="(img, index) in product.images" :key="index">
                <img :src="img" class="card-img-top" alt="..." />
              </slide>
            </carousel>
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-price">
                  {{
                    product.price | currency("$", 0, { symbolOnLeft: false })
                  }}
                </h5>
              </div>
              <AddToCart
                :name="product.name"
                :price="product.price"
                :product-id="product.id"
                :product-image="getImage(product.images)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import AddToCart from "@/components/AddToCart.vue";

export default {
  name: "Products-list",
  props: {
    msg: String
  },
  data() {
    return {
      products: []
    };
  },
  firestore() {
    return {
      // Collection
      products: db.collection("products")
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    }
  },
  components: {
    AddToCart
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products-list {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
.card-img-top {
  max-width: 100%;
}
</style>
