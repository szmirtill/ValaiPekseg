FROM node:18-alpine3.18

WORKDIR /app

# M�sold �t a package.json f�jlokat
COPY package*.json ./

# Telep�tsd a f�gg�s�geket
RUN npm install
RUN npm install react-router-dom

# M�sold �t a projekt f�jlokat
COPY . .

# �ll�tsd be a portot
EXPOSE 3000

# Ind�tsd el az alkalmaz�st
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
