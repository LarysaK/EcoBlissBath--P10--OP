const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "erh6he",
  env:{
    apiUrl: "http://localhost:8081",
    username: 'test2@test.fr',
    password: 'testtest' 
  },

  snapshotOnly: false,

  video: true, 
  

  e2e: {
    setupNodeEvents(on, config) { 
    },
    baseUrl : "http://localhost:8080",
    defaultCommandTimeout:30000,
    Timeout:30000,
  },
});
