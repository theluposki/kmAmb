import Dexie from "dexie";

const db = new Dexie("kmAmb");

db.version(1).stores({
  controleServico:
    "++id,nome,cnh,matricula,prefixo,kmEntrada,kmSaida,hPerSaida,hCarregamento,hFechamentoNF,hPerVolta,hDescarregamento,hFechamentoTicket",
});

export const saveLocalDb = async (obj) => {
  await db.controleServico.add(obj);
};
