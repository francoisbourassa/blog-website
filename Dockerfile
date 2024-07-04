# Utiliser une image Node.js officielle plus récente comme image de base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port sur lequel l'application va s'exécuter
EXPOSE 3008

# Commande pour démarrer l'application
CMD ["node", "server.js"]
