<template>
  <nav class="container-nav">
    <router-link class="nav-link-logo" active-class="nav-link-logo-active" to="/" exact>
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <div>
    <div class="info-user">
      <span>{{ user.nome }}</span>
    </div>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      user: [],
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }
}
</script>

<style scoped>
.container-nav {
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --font-primary: #f2f5f8;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-light);
  width: 100%;
  height: 45px;
}

.nav-link-logo {
  text-decoration: none;
  background: var(--bg-light);
  font-size: 16px;
  font-weight: 500;
  padding: 0px 5px;
}

.nav-link-logo img {
  background: var(--bg-light);
  width: 100px;
  height: 36px;
}

.nav-link-logo-active {
  text-decoration: none;
  background: var(--bg-light);
  font-size: 16px;
  font-weight: 500;
}

.nav-link {
  text-decoration: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  margin: 0px 10px;
  padding: 10px;
}

.nav-link:hover {
  transition: background-color ease-in-out 0.5s;
  background: var(--bg-placeholder);
}

.nav-link-active {
  text-decoration: none;
  background: var(--bg-placeholder);
  font-size: 16px;
  font-weight: 500;
  margin: 0px 10px;
  padding: 10px;
}

.container-nav div {
  background: var(--bg-light);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info-user {
  width: 200px;
  display: flex;
  justify-content: flex-end;
  padding: 0px 15px;
}
.info-user span {
  background: var(--bg-light);
  padding: 0px 10px;
  font-size: 12px;
  font-weight: 500;
}
</style>