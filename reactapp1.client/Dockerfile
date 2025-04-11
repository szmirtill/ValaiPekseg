FROM node:18-alpine3.18

WORKDIR /app

# Másold át a package.json fájlokat
COPY package*.json ./

# Telepítsd a függõségeket
RUN npm install
RUN npm install react-router-dom

# Másold át a projekt fájlokat
COPY . .

# Állítsd be a portot
EXPOSE 3000

# Indítsd el az alkalmazást
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
