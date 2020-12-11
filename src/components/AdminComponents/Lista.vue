<template>
  <div class="lista">
    <div class="header-lista">
      <div class="nameComponent">Lista de Serviços</div>
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
            <th>
              <button class="btn">
                <font-awesome-icon icon="plus"></font-awesome-icon>
              </button>
            </th>
          </tr>
        </thead>
        <tbody v-for="item in list" :key="item._id">
          <tr>
            <td>{{ item.motorista.nome }}</td>
            <td>{{ item.prefixo }}</td>
            <td>{{ item.dtEmitido }}</td>
            <td>{{ item.hrEmitido }}</td>
            <td>{{ item.kmEntrada }}</td>
            <td>{{ item.kmSaida }}</td>
            <td>{{ item.kmSaida - item.kmEntrada }} km</td>
            <td>
              <button class="btn">
                <font-awesome-icon icon="edit"></font-awesome-icon>
              </button>
              <button @click="deleteService(item._id)" class="btn">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Api from '../../js/api'

export default {
  data(){
    return {
      list: []
    }
  },
  async created() {
    this.list = await this.getAllServices()
  },
  methods: {
    async getAllServices(){
      const response = await Api.get('/controlKM')
      console.log(response.data.services)
      return response.data.services
    },
    async deleteService(id){
      const response = await Api.delete(`/controlKM/delete/${id}`)
      //console.log(response.data.message)
      this.list = await this.getAllServices()
      return 
    },
  }
}
</script>

<style scoped>
.lista {
  position: relative;
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
.pesquisa > input:hover {
    background: var(--font-primary);
    opacity: 0.8;
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

.lista-content {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
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
  margin-right: 5px;
}
.btn:hover {
  background: var(--bg-placeholder);
  opacity: 0.8;
}
.btn>svg {
  background: var(--bg-placeholder);
}
</style>