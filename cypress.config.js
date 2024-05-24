const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    apiUrl: "http://localhost:8081",
  },

  snapshotOnly: true,

  video: true, 
  

  e2e: {
    setupNodeEvents(on, config) { 
    },
    baseUrl : "http://localhost:8080",
  },
});
