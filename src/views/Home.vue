<template>
  <div class="home">
    <navigation />
    <div class="container-registro-lancamento">
      <div>
        <h3 class="title">Controle de Serviços</h3>
      </div>
      <hr />
      <div class="form-veiculo">
        <div>
          <label for="prefixo">Prefixo</label>
          <input
            v-model="prefixo"
            @keyup="setDataLocal('prefixo', 'prefixo')"
            id="prefixo"
            type="tel"
            placeholder="Prefixo"
          />
        </div>
        <div>
          <label for="kmEntrada">Entrada</label>
          <input
            v-model="kmEntrada"
            @keyup="setDataLocal('kmEntrada')"
            id="kmEntrada"
            type="tel"
            placeholder="KM Inícial"
          />
        </div>
        <div>
          <label for="kmSaida">Saída</label>
          <input
            v-model="kmSaida"
            @keyup="setDataLocal('kmSaida')"
            id="kmSaida"
            type="tel"
            placeholder="KM final"
          />
        </div>
      </div>
      <hr />

      <div class="check-in">
        <div>
          <label for="perSaida">Percurso Saída</label>
          <div class="input-group">
            <input
              v-model="hPerSaida"
              @keyup="setDataLocal('hPerSaida')"
              id="perSaida"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hPerSaida')">H</button>
          </div>
        </div>
        <div>
          <label for="carregamento">Carregamento</label>
          <div class="input-group">
            <input
              v-model="hCarregamento"
              @keyup="setDataLocal('hCarregamento')"
              id="carregamento"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hCarregamento')">H</button>
          </div>
        </div>
        <div>
          <label for="fechamentoNf">Fechamento NF</label>
          <div class="input-group">
            <input
              v-model="hFechamentoNF"
              @keyup="setDataLocal('hFechamentoNF')"
              id="fechamentoNf"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hFechamentoNF')">H</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="check-in">
        <div>
          <label for="perVolta">Percurso Volta</label>
          <div class="input-group">
            <input
              v-model="hPerVolta"
              @keyup="setDataLocal('hPerVolta')"
              id="perVolta"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hPerVolta')">H</button>
          </div>
        </div>
        <div>
          <label for="descarregamento">Descarregamento</label>
          <div class="input-group">
            <input
              v-model="hDescarregamento"
              @keyup="setDataLocal('hDescarregamento')"
              id="descarregamento"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hDescarregamento')">H</button>
          </div>
        </div>
        <div>
          <label for="fechamentoTicket">Fechamento Ticket</label>
          <div class="input-group">
            <input
              v-model="hFechamentoTicket"
              @keyup="setDataLocal('hFechamentoTicket')"
              id="fechamentoTicket"
              type="time"
              placeholder="time"
            />
            <button @click="setTimeAt('hFechamentoTicket')">H</button>
          </div>
        </div>
      </div>
      <div class="check-in">
        <span>{{ mensagemSucesso }}</span>
      </div>
      <div class="check-in">
        <button @click="save()">Emitir</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import navigation from "../components/navigation";
import { saveLocalDb, getAllServices, clearServicesLocal } from '../js/dbLocal'
import Api from "../js/api";
const motorista = JSON.parse(localStorage.getItem('currentUser'))

export default {
  components: {
    navigation,
  },
  data() {
    return {
      prefixo: "",
      kmEntrada: "",
      kmSaida: "",

      hPerSaida: "",
      hCarregamento: "",
      hFechamentoNF: "",
      hPerVolta: "",
      hDescarregamento: "",
      hFechamentoTicket: "",

      mensagemSucesso: ''
    };
  },
  async created() {
    this.getDataLocal();

    if(navigator.onLine){
      await this.syncMongoDb()
    } else {
      console.log('offline')
    }

    window.addEventListener('online',  async () => {
      await this.syncMongoDb()
    });
  },
  methods: {
    async syncMongoDb(){
        const arr = await getAllServices()
        await this.saveMongo(arr)
    },
    async saveMongo(arr){
        await arr.forEach(async item => {
            const response = await Api.post(`/controlKM`, {
              hrEmitido: item.hrEmitido,
              dtEmitido: item.dtEmitido,

              motorista: {
                id: motorista._id,
                nome: motorista.nome,
                cnh: motorista.cnh,
                matricula: motorista.matricula,
              },

              prefixo: item.prefixo,
              kmEntrada: item.kmEntrada,
              kmSaida: item.kmSaida,

              hPerSaida: item.hPerSaida,
              hCarregamento: item.hCarregamento,
              hFechamentoNF: item.hFechamentoNF,
              hPerVolta: item.hPerVolta,
              hDescarregamento: item.hDescarregamento,
              hFechamentoTicket: item.hFechamentoTicket,
            })
            
            await clearServicesLocal()
        });
    },
    async save() {

      if(navigator.onLine){
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
        this.wiewMessagem('Enviado com sucesso!!!')
        this.clearDataLocal()
      } else {
        console.log('offline')
        await saveLocalDb({
          hrEmitido: new Date().toLocaleTimeString('pt-br'),
          dtEmitido: new Date().toLocaleDateString('pt-br'),

          id: motorista.id,
          nome: motorista.nome,
          cnh: motorista.cnh,
          matricula: motorista.matricula,
          dataRegistro: motorista.dataRegistro,

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

        this.clearDataLocal()
        this.wiewMessagem('Enviado com sucesso!!!')
      }
    },
    wiewMessagem(message){
      this.mensagemSucesso = message
      setTimeout(() => {
        this.mensagemSucesso = ''
      }, 3000)
    },
    getDataLocal() {
      this.prefixo = localStorage.getItem("prefixo");
      this.kmEntrada = localStorage.getItem("kmEntrada");
      this.kmSaida = localStorage.getItem("kmSaida");

      this.hPerSaida = localStorage.getItem("hPerSaida");
      this.hCarregamento = localStorage.getItem("hCarregamento");
      this.hFechamentoNF = localStorage.getItem("hFechamentoNF");
      this.hPerVolta = localStorage.getItem("hPerVolta");
      this.hDescarregamento = localStorage.getItem("hDescarregamento");
      this.hFechamentoTicket = localStorage.getItem("hFechamentoTicket");
    },
    clearDataLocal() {
      this.prefixo = "";
      localStorage.setItem("prefixo", "");
      this.kmEntrada = "";
      localStorage.setItem("kmEntrada", "");
      this.kmSaida = "";
      localStorage.setItem("kmSaida", "");

      this.hPerSaida = "";
      localStorage.setItem("hPerSaida", "");
      this.hCarregamento = "";
      localStorage.setItem("hCarregamento", "");
      this.hFechamentoNF = "";
      localStorage.setItem("hFechamentoNF", "");
      this.hPerVolta = "";
      localStorage.setItem("hPerVolta", "");
      this.hDescarregamento = "";
      localStorage.setItem("hDescarregamento", "");
      this.hFechamentoTicket = "";
      localStorage.setItem("hFechamentoTicket", "");
    },
    setDataLocal(chave) {
      if (chave === "prefixo") {
        localStorage.setItem(chave, this.prefixo);
      }
      if (chave === "kmEntrada") {
        localStorage.setItem(chave, this.kmEntrada);
      }
      if (chave === "kmSaida") {
        localStorage.setItem(chave, this.kmSaida);
      }
    },
    setTimeAt(chave) {
      const time = new Date().toLocaleTimeString("pt-br");

      if (chave === "hPerSaida") {
        this.hPerSaida = time;
        localStorage.setItem(chave, this.hPerSaida);
      }
      if (chave === "hCarregamento") {
        this.hCarregamento = time;
        localStorage.setItem(chave, this.hCarregamento);
      }
      if (chave === "hFechamentoNF") {
        this.hFechamentoNF = time;
        localStorage.setItem(chave, this.hFechamentoNF);
      }
      if (chave === "hPerVolta") {
        this.hPerVolta = time;
        localStorage.setItem(chave, this.hPerVolta);
      }
      if (chave === "hDescarregamento") {
        this.hDescarregamento = time;
        localStorage.setItem(chave, this.hDescarregamento);
      }
      if (chave === "hFechamentoTicket") {
        this.hFechamentoTicket = time;
        localStorage.setItem(chave, this.hFechamentoTicket);
      }
    },
  },
};
</script>

<style scoped>
.container-registro-lancamento {
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --font-primary: #f2f5f8;


  background: #0b1015;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

hr {
  width: 90%;
  background: var(--bg-light);
  height: 2px;
  border: solid 1px var(--bg-light);
}
.title {
  padding: 20px 0px;
}
.form-veiculo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0px;
  width: 100%;
}

.form-veiculo div {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

input {
  background: var(--font-primary);
  flex: auto;
  width: 132px;
  height: 35px;
  border-radius: 5px;
  border: solid 2px var(--bg-light);
  color: var(--bg-light);
  font-size: 16px;
  padding: 0px 15px;
}
input:hover,
input:focus {
  transition: border ease-in-out 0.4s;
  border: solid 2px var(--bg-placeholder);
}

input::placeholder {
  color: var(--bg-placeholder);
}

.check-in {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 0px;
}
.check-in > div {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.input-group > input {
  background: var(--font-primary);
  flex: auto;
  width: auto;
  height: 35px;
  border-radius: 5px 0px 0px 5px;
  border: solid 2px var(--bg-light);
  color: var(--bg-light);
  font-size: 16px;
  padding: 0px 15px;
}

.input-group > button {
  height: 35px;
  background: var(--bg-light);
  width: auto;
  border: solid 2px var(--bg-light);
  border-radius: 0px 5px 5px 0px;
  padding: 0px 5px;
  font-weight: 500;
}

.input-group > button:hover {
  transition: background-color ease-in-out 0.4s;
  background: var(--bg-placeholder);

  transition: border ease-in-out 0.4s;
  border: solid 2px var(--bg-light);
}

button {
  background: var(--bg-light);
  width: 132px;
  height: 35px;
  padding: 0px 15px;
  border: solid 1px var(--bg-placeholder);
  border-radius: 3px;
  align-self: flex-end;
  font-weight: 500;
}

button:hover {
  transition: background-color ease-in-out 0.4s;
  background: var(--bg-placeholder);

  transition: border ease-in-out 0.4s;
  border: solid 1px var(--bg-light);
}
</style>