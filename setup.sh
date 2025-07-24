#!/bin/bash

# Create directories first
mkdir -p controllers middlewares models routes services utils config

# Then create files inside them
touch \
  controllers/auth.controller.js \
  middlewares/auth.middleware.js \
  middlewares/role.middleware.js \
  models/user.model.js \
  routes/auth.routes.js \
  services/token.service.js \
  utils/validators.js \
  config/db.js \
  .env \
  app.js \
  server.js
