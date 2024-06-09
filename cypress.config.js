const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    apiUrl: "http://localhost:8081",
    username: 'test2@test.fr',
    password: 'testtest' 
  },

  snapshotOnly: true,

  video: true, 
  

  e2e: {
    setupNodeEvents(on, config) { 
    },
    baseUrl : "http://localhost:8080",
    defaultCommandTimeout:10000,
  },
});
