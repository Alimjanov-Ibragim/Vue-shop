<template>
  <div class="orders">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Orders page</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic sunt
              vero laborum quasi fuga rerum temporibus quos dolorem quaerat iste
              voluptatum quae repellat sint deleniti iure, molestias corporis!
              Quibusdam, qui.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/orders.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test">
        <h3 class="d-flex align-items-center justify-content-between">
          Orders list
          <button @click="addNew" class="btn btn-primary ml-1">
            Show products
          </button>
        </h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in this.$store.state.cart"
                :key="index"
              >
                <td>
                  {{ product.productName }}
                </td>
                <td>
                  {{ product.productPrice }}
                </td>
                <td>
                  <button
                    @click="deleteProduct(product)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="miniCartOrders"
      tabindex="-1"
      role="dialog"
      aria-labelledby="miniCartOrdersLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="miniCartOrdersLabel">Products List</h2>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <VTable
              class="styled"
              :headers="headers"
              :items="products"
            ></VTable>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Back to orders
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fb, db } from "../firebase";
import { VueEditor } from "vue2-editor";
import { VTable } from "vuetensils";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: []
      },
      activeItem: null,
      modal: null,
      tag: null,
      headers: [{ key: "name" }, { key: "price" }]
    };
  },
  firestore() {
    return {
      // Collection
      products: db.collection("products")
    };
  },
  methods: {
    reset() {
      this.product = {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: []
      };
    },
    addNew() {
      this.modal = "new";
      $("#miniCartOrders").modal("show");
    },
    checkout() {
      "#miniCartOrders".modal("hide");
      this.$router.push("/checkout");
    },
    deleteProduct(product) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.product = product;
          this.$store.commit("removeFromCart", this.product);
          // this.$firestore.products.doc(product.id).delete();
          Toast.fire({
            icon: "success",
            title: "Deleted successfully"
          });
        }
      });
    }
  },
  components: {
    VueEditor,
    VTable
  },
  created() {}
};
</script>

<style>
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
.table-container table {
  width: 100%;
}

.table-container th {
  font-size: 20px;
  text-transform: capitalize;
}
</style>
