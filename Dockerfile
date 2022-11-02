FROM node:19-bullseye

WORKDIR /opt/unixsocket

RUN apt update \
    && apt install -y nano curl wget tcpdump dnsutils tzdata netcat net-tools procps

# RUN npm install -g pm2 \
#     && echo "cd /opt/unixsocket" >> /etc/bash.bashrc \
#     && cd /opt/unixsocket

RUN echo "cd /opt/unixsocket" >> /etc/bash.bashrc \
    && cd /opt/unixsocket

COPY . .

ENV PATH ${PATH}:/opt/unixsocket

#CMD [ "pm2", "start", "server.js", "--no-daemon" ]
CMD [ "node", "/opt/unixsocket/server.js"]
