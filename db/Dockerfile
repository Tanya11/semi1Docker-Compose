FROM mysql:5.7

#ENV MYSQL_DATABASE semi1
#ENV MYSQL_ROOT_PASSWORD 12345
#ENV MYSQL_USER susel
#ENV MYSQL_PASSWORD 12345
#ENV DATABASE_HOST db

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts /docker-entrypoint-initdb.d/
