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
            <th>Motorista</th>
            <th>Prefixo</th>
            <th>Data</th>
            <th>Emitido ás</th>
            <th>KM entrada</th>
            <th>KM Saída</th>
            <th>KM Rodado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jailson da silva</td>
            <td>568</td>
            <td>06/12/2020</td>
            <td>09:44</td>
            <td>123400</td>
            <td>123550</td>
            <td>150</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Api from '../../js/api'

export default {
  async created() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers(){
      const response = await Api.get('/users')

      return console.log(response.data.users)
    }
  }
}
</script>

<style scoped>
.users {
  flex: 1;
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --font-primary: #f2f5f8;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  color: var(--bg-primary)
}
.pesquisa > button {
  background: var(--bg-placeholder);
  height: 35px;
  border: solid 1px var(--bg-primary);
  border-radius: 0px 5px 5px 0px;
  padding: 0px 15px;
}

.pesquisa > button > svg {
  background: var(--bg-placeholder);
}
.lista-content {
  flex: 1;
  width: 100%;
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
</style>