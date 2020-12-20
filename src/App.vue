<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
* {
  --bg-primary: #0b1015;
  --font-primary: #f2f5f8;
  
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Roboto', sans-serif;
  color: var(--font-primary);
  background: #0b1015;
}

.container {
  width: 100vw;
  height: 100vh;
  background: var(--bg-primary);
}
</style>
