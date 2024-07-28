# Utilisez l'image officielle NGINX comme image de base
FROM nginx:alpine

# Supprimez la configuration NGINX par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copiez vos fichiers de configuration NGINX personnalisés dans le conteneur
COPY config/ /etc/nginx/conf.d/

# (Facultatif) Copiez vos fichiers statiques dans le conteneur
COPY public/ /usr/share/nginx/html/

# Exposez le port 80 pour permettre l'accès au service NGINX
EXPOSE 80

# Lancez NGINX en premier plan pour garder le conteneur en vie
CMD ["nginx", "-g", "daemon off;"]