<template>
  <div class="users">
    <div class="header-lista">
      <div class="nameComponent">Usúarios do Sistema</div>
      <div class="controllers">
        <div class="pesquisa">
          <input type="search" placeholder="Faça uma pesquisa" />
          <button>
            <font-awesome-icon icon="search"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="lista-content">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNH</th>
            <th>Vencimento CNH</th>
            <th>Matrícula</th>
            <th>Email</th>
            <th>Permição</th>
            <th>
              <button class="btn">
                <font-awesome-icon
                  @click="showAddUser()"
                  icon="plus"
                ></font-awesome-icon>
              </button>
            </th>
          </tr>
        </thead>
        <tbody v-for="item in list" :key="item._id">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.cnh }}</td>
            <td>{{ item.vencimentoCnh }}</td>
            <td>{{ item.matricula }}</td>
            <td>{{ item.email }}</td>
            <td>
              {{ item.roles[0] === "admin" ? "Adiministrador" : "Usuário" }}
            </td>
            <td>
              <button @click="setUserAsUpdate(item)" class="btn">
                <font-awesome-icon icon="edit"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal">
      <div class="header-model">
        <h1>Editar usuário</h1>
        <div>
          <span>{{ userEdit._id }}</span>
          <font-awesome-icon
            @click="closeModal()"
            icon="times"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="modal-form">
        <label for="nome">Nome</label>
        <input v-model="nome" id="nome" type="text" placeholder="Nome" />
        <label for="cnh">CNH</label>
        <input v-model="cnh" id="cnh" type="text" placeholder="CNH" />
        <label for="vencimentoCnh">Vencimento CNH</label>
        <input
          v-model="vencimentoCnh"
          id="vencimentoCnh"
          type="text"
          placeholder="Vencimento CNH"
        />
        <label for="matricula">Matrícula</label>
        <input
          v-model="matricula"
          id="matricula"
          type="text"
          placeholder="Matrícula"
        />
        <label for="email">E-mail</label>
        <input v-model="email" id="email" type="email" placeholder="email" />
        <label for="roles">Permição</label>
        <select v-model="roles" name="roles" id="roles">
          <option value="user">Usuário</option>
          <option value="admin">Adiministrador</option>
        </select>
      </div>
      <div class="modal-buttons">
        <button @click="deleteUser(userEdit._id)" class="bg-danger">
          Deletar
        </button>
        <div class="info-create-at">
          Usuário criado no {{ createDateAt }} Ás {{ createTimeAt }}
        </div>
        <button @click="updateUser(userEdit._id)">Atualizar</button>
      </div>
    </div>

    <!-- Modal Add -->

    <div v-if="showModalAdd" class="modal">
      <div class="header-model">
        <h1>Criar novo usuário</h1>
        <div>
          <span>{{ userEdit._id }}</span>
          <font-awesome-icon
            @click="closeModalAdd()"
            icon="times"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="modal-form">
        <label for="nome">Nome</label>
        <input v-model="nome" id="nome" type="text" placeholder="Nome" />
        <label for="cnh">CNH</label>
        <input v-model="cnh" id="cnh" type="text" placeholder="CNH" />
        <label for="vencimentoCnh">Vencimento CNH</label>
        <input
          v-model="vencimentoCnh"
          id="vencimentoCnh"
          type="text"
          placeholder="Vencimento CNH"
        />
        <label for="matricula">Matrícula</label>
        <input
          v-model="matricula"
          id="matricula"
          type="text"
          placeholder="Matrícula"
        />
        <label for="email">E-mail</label>
        <input v-model="email" id="email" type="email" placeholder="email" />
        <label for="password">Senha</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Senha"
        />
        <label for="roles">Permição</label>
        <select v-model="roles" name="roles" id="roles">
          <option value="user">Usuário</option>
          <option value="admin">Adiministrador</option>
        </select>
      </div>

      <div class="modal-buttons">
        <button @click="registerUser()">Criar usuário</button>
        {{ roles }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../js/api";

export default {
  data() {
    return {
      list: [],
      userEdit: {},

      showModal: false,
      showModalAdd: false,

      nome: "",
      cnh: "",
      vencimentoCnh: "",
      matricula: "",
      email: "",
      roles: "user",
      createDateAt: "",
      createTimeAt: "",

      password: "",
    };
  },
  async created() {
    this.list = await this.getAllUsers();
  },
  methods: {
    async getAllUsers() {
      const token = localStorage.getItem("token");
      const response = await Api.get("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.users.reverse();
    },
    async deleteUser(id) {
      const response = await Api.delete(`/user/delete/${id}`);
      //console.log(response.data.message)
      this.list = await this.getAllUsers();
      this.closeModal();
      return;
    },
    async registerUser() {
      let arr = new Array(this.roles);
      const response = await Api.post(`/user/register`, {
        nome: this.nome,
        cnh: this.cnh,
        vencimentoCnh: this.vencimentoCnh,
        matricula: this.matricula,
        email: this.email,
        password: this.password,
        createDateAt: new Date().toLocaleDateString("pt-br"),
        createTimeAt: new Date().toLocaleTimeString("pt-br"),
        roles: arr,
      });
      this.closeModalAdd();
      this.list = await this.getAllUsers();
    },
    async updateUser(id) {
      let arr = new Array(this.roles);
      const response = await Api.put(`/user/update/${id}`, {
        nome: this.nome,
        cnh: this.cnh,
        vencimentoCnh: this.vencimentoCnh,
        matricula: this.matricula,
        email: this.email,
        roles: arr,
      });
      this.closeModal();
      this.list = await this.getAllUsers();
    },
    setUserAsUpdate(item) {
      this.showModal = true;
      this.userEdit = item;

      this.nome = this.userEdit.nome;
      this.cnh = this.userEdit.cnh;
      this.vencimentoCnh = this.userEdit.vencimentoCnh;
      this.matricula = this.userEdit.matricula;
      this.email = this.userEdit.email;
      this.roles = this.userEdit.roles[0];
      this.createDateAt = this.userEdit.createDateAt;
      this.createTimeAt = this.userEdit.createTimeAt;
    },
    closeModal() {
      this.showModal = false;

      this.userEdit = {};

      this.nome = "";
      this.cnh = "";
      this.vencimentoCnh = "";
      this.matricula = "";
      this.email = "";
      this.roles = "";
      this.createDateAt = "";
      this.createTimeAt = "";
    },
    showAddUser() {
      this.showModalAdd = true;
    },
    closeModalAdd() {
      this.showModalAdd = false;

      this.nome = "";
      this.cnh = "";
      this.vencimentoCnh = "";
      this.matricula = "";
      this.email = "";
      this.roles = "user";
      this.createDateAt = "";
      this.createTimeAt = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.users {
  flex: 1;
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --bg-danger: #b12621;
  --font-primary: #f2f5f8;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.modal {
  position: absolute;
  z-index: 5000;
  top: 35px;
  right: 130px;
  width: 700px;
  height: 580px;
  border-radius: 3px;
  box-shadow: 2px 2px 20px var(--bg-placeholder);
  background: var(--bg-light);
  padding: 10px 20px;
}

.modal > .header-model {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--bg-placeholder);
  background: var(--bg-light);
}

.modal > .header-model > h1 {
  background: var(--bg-light);
}

.modal > .header-model > div > span {
  background: var(--bg-light);
  color: var(--bg-placeholder);
  margin-right: 30px;
}

.modal > .header-model > div , svg {
  background: var(--bg-light);
}

.modal > .header-model > div > svg:hover {
  transform: scale(1.2);
}

.modal > .modal-form {
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  background: var(--bg-light);
}

.modal > .modal-form > label {
  background: var(--bg-light);
}

.modal > .modal-form > input {
  background: var(--font-primary);
  height: 35px;
  border: solid 1px var(--bg-primary);
  border-radius: 5px;
  padding: 0px 15px;
  color: var(--bg-primary);
  margin: 5px 0px;
}
.modal > .modal-form > input:hover {
  transition: opacity ease 0.5s;
  background: var(--font-primary);
  opacity: 0.8;
}

.modal > .modal-form > select {
  position: relative;
  background: var(--font-primary);
  height: 35px;
  border: solid 1px var(--bg-primary);
  border-radius: 5px;
  padding: 0px 15px;
  color: var(--bg-primary);
  margin: 5px 0px;
}

.modal > .modal-form > select > option {
  color: var(--bg-primary);
}

.modal > .modal-buttons {
  background: var(--bg-light);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px 40px;
}

.bg-danger {
  background: var(--bg-danger) !important;
}

.modal > .modal-buttons > button {
  background: var(--bg-placeholder);
  height: 35px;
  border: solid 1px var(--bg-primary);
  border-radius: 3px;
  padding: 0px 15px;
  font-weight: 500;
}

.modal > .modal-buttons > button:hover {
  transition: background-color ease 0.4s;
  transition: opacity ease 0.4s;
  background: var(--bg-placeholder);
  opacity: 0.8;
}

.info-create-at {
  display: flex;
  font-size: 12px;
  align-items: center;
  color: var(--bg-placeholder);
  background: var(--bg-light);
}

.header-lista {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 50px;
  width: 100%;
  padding: 0px 15px;
  border-top: solid 1px var(--bg-primary);
  border-left: solid 1px var(--bg-primary);
  background: var(--bg-light);
}
.nameComponent {
  background: var(--bg-light);
}
.controllers {
  background: var(--bg-light);
}

.pesquisa {
  display: flex;
  background: var(--bg-light);
}
.pesquisa > input {
  background: var(--font-primary);
  height: 35px;
  width: 180px;
  border: solid 1px var(--bg-primary);
  border-radius: 5px 0px 0px 5px;
  padding: 0px 15px;
  color: var(--bg-primary);
}
.pesquisa > button {
  background: var(--bg-placeholder);
  height: 35px;
  border: solid 1px var(--bg-primary);
  border-radius: 0px 5px 5px 0px;
  padding: 0px 15px;
}
.pesquisa > button:hover {
  background: var(--bg-placeholder);
  opacity: 0.8;
}

.pesquisa > button > svg {
  background: var(--bg-placeholder);
}
.lista-content {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--bg-light);
  opacity: 0.2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--bg-placeholder);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--bg-light);
  opacity: 0.3;
}
.table {
  width: 100%;
}
.table > thead > tr {
  white-space: nowrap;
  height: 40px;
}

.table > thead th {
  padding: 0px 15px;
  color: var(--font-primary);
  border-bottom: solid 1px var(--font-primary);
}

.table > tbody tr {
  height: 35px;
}

.table > tbody td {
  border-bottom: solid 1px var(--bg-light);
  padding: 0px 15px;
}

.table > tbody tr:hover {
  box-shadow: 1px 3px 5px var(--bg-placeholder);
  transition: box-shadow ease-in-out 0.3s;
}

.table > tbody td:hover {
  box-shadow: 1px 3px 5px var(--bg-placeholder);
  transition: box-shadow ease 0.2s;
  background: var(--bg-light);
}

.btn {
  background: var(--bg-placeholder);
  height: 25px;
  border: solid 1px var(--bg-primary);
  border-radius: 5px;
  padding: 5px;
}
.btn:hover {
  background: var(--bg-placeholder);
  opacity: 0.8;
}
.btn > svg {
  background: var(--bg-placeholder);
}
</style>