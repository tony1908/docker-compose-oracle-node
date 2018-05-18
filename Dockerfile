FROM node
WORKDIR /app
COPY app/package.json /app/package.json
RUN npm install
RUN npm install oracle/node-oracledb.git#v2.2.0
COPY app /app
RUN apt-get update
RUN apt-get -y upgrade 
RUN apt-get -y install libapache2-mod-wsgi
RUN apt-get -y install alien
RUN alien -i oracle-instantclient11.2-basic-11.2.0.4.0-1.x86_64.rpm
ENV ORACLE_HOME="/usr/lib/oracle/11.2/client64"
ENV LD_LIBRARY_PATH="/usr/lib/oracle/11.2/client64/lib:${LD_LIBRARY_PATH}"
ENV PATH="${PATH}:$ORACLE_HOME/bin"
RUN mkdir $ORACLE_HOME/network
RUN mkdir $ORACLE_HOME/network/admin
RUN mv tnsnames.ora $ORACLE_HOME/network/admin
ENV TNS_ADMIN="/usr/lib/oracle/11.2/client64/network/admin/tnsnames.ora"
RUN ldconfig
RUN apt-get -y install libaio1
CMD npm start