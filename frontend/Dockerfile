FROM node:22-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# for ease of builds rm on prod
# COPY node_modules node_modules

# RUN npm i
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]