<template>
  <div class="lista">
    <div class="header-lista">
      <div class="nameComponent">Lista de Serviços</div>
      <div class="controllers">
        <div class="pesquisa">
          <input v-model="search" type="search" placeholder="Faça uma pesquisa" />
          <button @click="buscar()">
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
              <button @click="showAddUser()" class="btn">
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
              <button class="btn" @click="setServiceAsUpdate(item)">
                <font-awesome-icon icon="edit"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->

    <div v-if="showModal" class="modal">
      <div class="header-model">
        <h1>Editar serviço</h1>
        <div>
          <span>{{ serviceEdit._id }}</span>
          <font-awesome-icon
            @click="closeModal()"
            icon="times"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="modal-form">
        <div class="info-moto">
          <div class="dados">
            <span>Nome: {{ serviceEdit.motorista.nome }}</span>
            <span>Matricula: {{ serviceEdit.motorista.matricula }}</span>
            <div class="dados-cnh">
              <span>CNH: {{ serviceEdit.motorista.cnh }}</span>
              <span class="venc-cnh">Vencimento {{ serviceEdit.motorista.vencimentoCnh }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="prefixo">Prefixo</label>
          <input v-model="prefixo" id="prefixo" type="text" placeholder="Prefixo" />
        </div>

        <div>
          <label for="dtEmitido">Data da Emissão</label>
          <input disabled class="disabled" v-model="dtEmitido" id="dtEmitido" type="text" placeholder="data da Emissão" />
        </div>

        <div>
          <label for="hrEmitido">Hora da Emissão</label>
          <input disabled class="disabled" v-model="hrEmitido" id="hrEmitido" type="time" placeholder="Hora da Emissão" />
        </div>

        <div>
          <label for="kmEntrada">KM Entrada</label>
          <input v-model="kmEntrada" id="kmEntrada" type="tel" placeholder="KM Entrada" />
        </div>

        <div>
          <label for="kmSaida">KM Saída</label>
          <input v-model="kmSaida" id="kmSaida" type="tel" placeholder="KM Saída" />
        </div>

        <div>
          <label for="hPerSaida">Horário Percurso Saida</label>
          <input v-model="hPerSaida" id="hPerSaida" type="time" placeholder="Horário Percurso Saida" />
        </div>

        <div>
          <label for="hCarregamento">Horário Carregamento</label>
          <input v-model="hCarregamento" id="hCarregamento" type="time" placeholder="Horário Carregamento" />
        </div>

        <div>
          <label for="hFechamentoNF">Horário Fechamento Nota Fiscal</label>
          <input v-model="hFechamentoNF" id="hFechamentoNF" type="time" placeholder="Horário Fechamento Nota Fiscal" />
        </div>
        
        <div>
          <label for="hPerVolta">Horário Percurso Volta</label>
          <input v-model="hPerVolta" id="hPerVolta" type="time" placeholder="Horário Percurso Saida" />
        </div>

        <div>
          <label for="hDescarregamento">Horário Descarregamento</label>
          <input v-model="hDescarregamento" id="hDescarregamento" type="time" placeholder="Horário Descarregamento" />
        </div>

        <div>
          <label for="hFechamentoTicket">Horário Fechamento Ticket</label>
          <input v-model="hFechamentoTicket" id="hFechamentoTicket" type="time" placeholder="Horário Fechamento Ticket" />
        </div>


      </div>
      <div class="modal-buttons">
        <button @click=" deleteService(serviceEdit._id)" class="bg-danger">
          Deletar
        </button>
        <div class="info-create-at">Serviço</div>
        <button @click="updateService(serviceEdit._id)">Atualizar</button>
      </div>
    </div>

    <!-- Modal Add -->

    <div v-if="showModalAdd" class="modal">
      <div class="header-model">
        <h1>Editar serviço</h1>
        <div>
          <span>Novo registro</span>
          <font-awesome-icon
            @click="closeModalAdd()"
            icon="times"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="modal-form">

        <div>
          <label for="prefixo">Prefixo</label>
          <input v-model="prefixo" id="prefixo" type="text" placeholder="Prefixo" />
        </div>

        <div>
          <label for="dtEmitido">Data da Emissão</label>
          <input disabled v-model="dtEmitido" class="disabled" id="dtEmitido" type="text" placeholder="data da Emissão" />
        </div>

        <div>
          <label for="hrEmitido">Hora da Emissão</label>
          <input disabled v-model="hrEmitido" class="disabled" id="hrEmitido" type="time" placeholder="Hora da Emissão" />
        </div>

        <div>
          <label for="kmEntrada">KM Entrada</label>
          <input v-model="kmEntrada" id="kmEntrada" type="tel" placeholder="KM Entrada" />
        </div>

        <div>
          <label for="kmSaida">KM Saída</label>
          <input v-model="kmSaida" id="kmSaida" type="tel" placeholder="KM Saída" />
        </div>

        <div>
          <label for="hPerSaida">Horário Percurso Saida</label>
          <input v-model="hPerSaida" id="hPerSaida" type="time" placeholder="Horário Percurso Saida" />
        </div>

        <div>
          <label for="hCarregamento">Horário Carregamento</label>
          <input v-model="hCarregamento" id="hCarregamento" type="time" placeholder="Horário Carregamento" />
        </div>

        <div>
          <label for="hFechamentoNF">Horário Fechamento Nota Fiscal</label>
          <input v-model="hFechamentoNF" id="hFechamentoNF" type="time" placeholder="Horário Fechamento Nota Fiscal" />
        </div>
        
        <div>
          <label for="hPerVolta">Horário Percurso Volta</label>
          <input v-model="hPerVolta" id="hPerVolta" type="time" placeholder="Horário Percurso Saida" />
        </div>

        <div>
          <label for="hDescarregamento">Horário Descarregamento</label>
          <input v-model="hDescarregamento" id="hDescarregamento" type="time" placeholder="Horário Descarregamento" />
        </div>

        <div>
          <label for="hFechamentoTicket">Horário Fechamento Ticket</label>
          <input v-model="hFechamentoTicket" id="hFechamentoTicket" type="time" placeholder="Horário Fechamento Ticket" />
        </div>


      </div>
      <div class="modal-buttons">
        <div class="info-create-at">Serviço</div>
        <button @click="registerService()">Registrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../js/api";
const motorista = JSON.parse(localStorage.getItem('currentUser'))

export default {
  data() {
    return {
      list: [],
      search: '',

      showModal: false,
      showModalAdd: false,

      serviceEdit: {},

       hrEmitido: '',
       dtEmitido: '',
       prefixo: '',
       kmEntrada: '',
       kmSaida: '',
       hPerSaida: '',
       hCarregamento: '',
       hFechamentoNF: '',
       hPerVolta: '',
       hDescarregamento: '',
       hFechamentoTicket: '',
    };
  },
  async created() {
    this.list = await this.getAllServices();
  },
  methods: {
    async getAllServices() {
      const token = localStorage.getItem("token");
      const response = await Api.get("/controlKM", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.services.reverse();
    },
    async registerService() {
        const response = await Api.post(`/controlKM`, {
              hrEmitido: new Date().toLocaleTimeString('pt-br'),
              dtEmitido: new Date().toLocaleDateString('pt-br'),

              motorista: {
                id: motorista.id,
                nome: motorista.nome,
                cnh: motorista.cnh,
                matricula: motorista.matricula,
              },

              prefixo: this.prefixo,
              kmEntrada: this.kmEntrada,
              kmSaida: this.kmSaida,

              hPerSaida: this.hPerSaida,
              hCarregamento: this.hCarregamento,
              hFechamentoNF: this.hFechamentoNF,
              hPerVolta: this.hPerVolta,
              hDescarregamento: this.hDescarregamento,
              hFechamentoTicket: this.hFechamentoTicket,
        })
        this.closeModalAdd()
        this.list = await this.getAllServices();
    },
    async deleteService(id) {
      const response = await Api.delete(`/controlKM/delete/${id}`);
      //console.log(response.data.message)
      this.list = await this.getAllServices();

      this.closeModal()
      return;
    },
    async buscar(){
        const search = this.search
        const regData = /\d{2}\/\d{2}\/\d{4}/
        
        if(regData.test(search)){
          console.log('entrou')
        }

        console.log('buscar')
    },
    async updateService(id) {
      let arr = new Array(this.roles);
      const response = await Api.put(`/controlKM/update/${id}`, {
          hrEmitido: this.hrEmitido,
          dtEmitido: this.dtEmitido,
          prefixo: this.prefixo,
          kmEntrada: this.kmEntrada,
          kmSaida: this.kmSaida,
          hPerSaida: this.hPerSaida,
          hCarregamento: this.hCarregamento,
          hFechamentoNF: this.hFechamentoNF,
          hPerVolta: this.hPerVolta,
          hDescarregamento: this.hDescarregamento,
          hFechamentoTicket: this.hFechamentoTicket,
      });
      this.closeModal();
      this.list = await this.getAllServices();
    },
    setServiceAsUpdate(item) {
      this.closeModal()
      this.showModal = true;
      this.serviceEdit = item;


       this.hrEmitido = this.serviceEdit.hrEmitido
       this.dtEmitido = this.serviceEdit.dtEmitido
       this.prefixo = this.serviceEdit.prefixo
       this.kmEntrada = this.serviceEdit.kmEntrada
       this.kmSaida = this.serviceEdit.kmSaida
       this.hPerSaida = this.serviceEdit.hPerSaida
       this.hCarregamento = this.serviceEdit.hCarregamento
       this.hFechamentoNF = this.serviceEdit.hFechamentoNF
       this.hPerVolta = this.serviceEdit.hPerVolta
       this.hDescarregamento = this.serviceEdit.hDescarregamento
       this.hFechamentoTicket = this.serviceEdit.hFechamentoTicket
    },
    closeModal() {
      this.showModal = false;
      this.userEdit = {};


       this.hrEmitido = ''
       this.dtEmitido = ''
       this.prefixo = ''
       this.kmEntrada = ''
       this.kmSaida = ''
       this.hPerSaida = ''
       this.hCarregamento = ''
       this.hFechamentoNF = ''
       this.hPerVolta = ''
       this.hDescarregamento = ''
       this.hFechamentoTicket = ''
    },
    showAddUser() {
      this.hrEmitido = new Date().toLocaleTimeString('pt-br')
      this.dtEmitido = new Date().toLocaleDateString('pt-br')

      this.showModalAdd = true;
    },
    closeModalAdd() {
      this.showModalAdd = false;

       this.hrEmitido = ''
       this.dtEmitido = ''
       this.prefixo = ''
       this.kmEntrada = ''
       this.kmSaida = ''
       this.hPerSaida = ''
       this.hCarregamento = ''
       this.hFechamentoNF = ''
       this.hPerVolta = ''
       this.hDescarregamento = ''
       this.hFechamentoTicket = ''
    },
  },
};
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

.modal {
  position: absolute;
  z-index: 5000;
  top: 35px;
  right: 130px;
  width: 700px;
  height: 480px;
  border-radius: 3px;
  box-shadow: 2px 2px 20px var(--bg-placeholder);
  background: var(--bg-light);
  padding: 10px 20px;
}
.modal .disabled {
  opacity: 0.5;
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 40px;
  background: var(--bg-light);
}

.modal-form > .info-moto {
  background: var(--bg-light);
  width: 100%;
  padding-bottom: 15px;
}
.modal-form > .info-moto > .dados span {
  background: var(--bg-light);
}
.modal-form > .info-moto > .dados {
  background: var(--bg-light);
  display: flex;
  justify-content: space-between;
}
.modal-form > .info-moto > .dados > .dados-cnh {
  background: var(--bg-light);
  display: flex;
  flex-direction: column;
}
.modal-form > .info-moto > .dados > .dados-cnh > .venc-cnh {
  font-size: 12px;
  color: var(--bg-placeholder);
  background: var(--bg-light);
  align-self: flex-end;
}

.modal > .modal-form > div {
  background: var(--bg-light);
  display: flex;
  flex-direction: column;
}

.modal > .modal-form > div > label {
  background: var(--bg-light);
}

.modal > .modal-form > div > input {
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
.btn > svg {
  background: var(--bg-placeholder);
}
</style>