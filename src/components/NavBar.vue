<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">Vue Shop</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <a
              class="btn my-2 ml-2 my-sm-0"
              type="submit"
              data-toggle="modal"
              data-target="#miniCart"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
            <a
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              data-toggle="modal"
              data-target="#login"
            >
              Sign In/ Sign Up
            </a>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {}
};
</script>

<style scoped>
.form-inline {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
