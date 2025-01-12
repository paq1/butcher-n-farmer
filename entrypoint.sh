#!/bin/sh

echo "Starting entrypoint script..."

# Debug : Vérifie si les variables d'environnement sont présentes
echo "Environment variables:"
env

# Chemin du fichier env-config.js
ENV_CONFIG_FILE="/usr/share/nginx/html/assets/env-config.js"
echo "Writing environment variables to $ENV_CONFIG_FILE"

# Remplacement des placeholders par les valeurs des variables d'environnement
cat <<EOF > $ENV_CONFIG_FILE
(function (window) {
  window.__env = window.__env || {};
  window.__env.ENV = "${ENV}";
})(this);
EOF

# Debug : Vérifie si le fichier a été généré correctement
echo "Generated $ENV_CONFIG_FILE:"
cat $ENV_CONFIG_FILE

# Vérifie la configuration NGINX avant de démarrer
echo "Checking NGINX configuration..."
nginx -t || exit 1

# Démarre NGINX en mode "foreground"
echo "Starting NGINX..."
nginx -g "daemon off;"
