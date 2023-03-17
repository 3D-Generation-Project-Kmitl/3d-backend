module.exports = {
  apps: [
    {
      name: "3d-backend",
      script: "./dist/server.js",
      instances: 4,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};
