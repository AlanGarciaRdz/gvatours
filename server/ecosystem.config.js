module.exports = {
    apps : [
        {
          name: "gva-service",
          script: "./app.js",
          watch: true,
          env: {
              "PORT": 19001,
              "NODE_ENV": "production",
          }
        }
    ]
  }