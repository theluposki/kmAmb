<template>
  <div class="Admin">
    <navigation />
    <div class="container-admin">
      <aside class="aside">
        <ul class="list-group">
          <li @click="activeList" class="list-group-item">Lista</li>
          <li @click="activeUsers" class="list-group-item">Users</li>
        </ul>
      </aside>
      <section class="section">
        <Lista v-if="wiewList" />
        <Users v-if="wiewUsers" />
      </section>
    </div>
  </div>
</template>

<script>
import navigation from "../components/navigation";
import Lista from "../components/AdminComponents/Lista";
import Users from "../components/AdminComponents/Users";

export default {
  components: {
    navigation,
    Lista,
    Users,
  },
  data() {
    return {
      wiewList: true,
      wiewUsers: false,
    };
  },
  methods: {
    activeList() {
      this.wiewList = true;
      this.wiewUsers = false;
    },
    activeUsers() {
      this.wiewList = false;
      this.wiewUsers = true;
    },
  },
};
</script>

<style scoped>
.Admin {
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --font-primary: #f2f5f8;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.container-admin {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.aside {
  flex: 1;
  width: 250px;
  min-width: 250px;
  border-top: solid 1px var(--bg-primary);
  border-radius: 0px 2px 2px 0px;
  background: var(--bg-light);
}

.section {
  width: 100%;
}

.list-group {
  width: 100%;
}
.list-group-item {
  background: var(--bg-light);
  width: 100%;
  padding: 10px;
  font-weight: 500;
  box-shadow: 1px 1px 5px #010201;
}

.list-group-item:hover {
  transition: box-shadow ease-in-out 0.5s;
  box-shadow: 1px 3px 25px #010201;
  font-size: 18px;
}

.list-group-link {
  background: var(--bg-light);
  text-decoration: none;
}
</style>
