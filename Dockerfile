FROM node:lts-buster
RUN git clone https://github.com/MLILA17/DML-MD/root/MLILA17
WORKDIR /root/MLILA17
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
