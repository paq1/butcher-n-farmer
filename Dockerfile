FROM node:22 as builder
ARG BUILD_PROG=build
WORKDIR app
COPY . ./
RUN npm install
RUN npm run $BUILD_PROG

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/butcher-n-farmer/browser /usr/share/nginx/html

# Script pour injecter les variables d'environnement dans env-config.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Commande d'entrée
ENTRYPOINT ["/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]
