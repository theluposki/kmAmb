import Dexie from "dexie";

const db = new Dexie("kmAmb");

db.version(1).stores({
  controleServico:
    "++id,nome,cnh,matricula,prefixo,kmEntrada,kmSaida,hPerSaida,hCarregamento,hFechamentoNF,hPerVolta,hDescarregamento,hFechamentoTicket",
});
//CREATE
export const saveLocalDb = async (obj) => {
  await db.controleServico.add(obj);
};
//READ
export const getAllServices = async () => {
    return await db.controleServico.toArray()
}
//UPDATE
const update = async (id, obj) => {
   await db.controleServico.update(id , obj)             
}
//DELETE
const del = async (id) => {
   await db.controleServico.delete(id)
}

export const clearServicesLocal = async () => {
  return db.controleServico.clear()
}
