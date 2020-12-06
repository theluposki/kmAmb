<template>
  <div class="container-login">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="form">
      <input type="text" placeholder="Digite seu email" />
      <input type="text" placeholder="Digite sua senha" />
      <button>Acessar</button>
    </div>
  </div>
</template>

<style scoped>
.container-login {
  --bg-primary: #0b1015;
  --bg-light: #17212b;
  --bg-placeholder: #577ea6;
  --font-primary: #f2f5f8;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo {
  padding: 20px;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form input {
  background: var(--font-primary);
  width: 300px;
  height: 40px;
  margin: 5px;
  border-radius: 5px;
  border: solid 2px var(--bg-light);
  color: var(--bg-light);
  font-size: 16px;
  padding: 0px 15px;
}
.form input:hover,
.form input:focus {
  transition: border ease-in-out 0.4s;
  border: solid 2px var(--bg-placeholder);
}

.form input::placeholder {
  color: var(--bg-placeholder);
}

.form button {
  background: var(--bg-light);
  width: auto;
  height: 40px;
  padding: 0px 15px;
  border: solid 1px var(--bg-placeholder);
  border-radius: 3px;
  margin-right: 5px;
  margin-top: 10px;
  align-self: flex-end;
  font-weight: 500;
}

.form button:hover {
  transition: background-color ease-in-out 0.4s;
  background: var(--bg-placeholder);

  transition: border ease-in-out 0.4s;
  border: solid 1px var(--bg-light);
}
</style>