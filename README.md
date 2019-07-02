# semi1Docker-Compose
despliegue de imagenes con docker compose

# Instalación de Docker Compose:
  1-. Correr el siguiente comando:
      
      *   sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

        -- Si se desea instalar otra version de Docker compose sustituir el    "1.24.0" por la versión deseada.

  2-. Aplicarle permisos al archivo binario de docker-compose
      
      *  sudo chmod +x /usr/local/bin/docker-compose
 
  3-. Revisar que la instalación se haya realizado correctamente
      
      *  docker-compose --version
 
 # Despliegue de imagenes en Docker-Compose:
  
  1-. Crear directorio donde tendrán los archivos del la aplicación
      
      * mkdir semi1_fase2
      
      * cd semi1_fase2/
      
  2-. Crear directorio para las imagenes de la api, la db y servidor web
      
      * mkdir web
      
      * mkdir db
      
      * mkdir server
  
  3-. Crear los Dockerfile y archivos necesarios para cada imagen con su respectivo contenido.
  
        -- El contenido de los archivos para cada imagen se pueden copiar de los documentos en el repositorio.
        
  4-. Regresar al directorio y crear el archivo "docker-compose.yml"
      
      * cd ..
      
      * mkdir docker-compose.yml
      
      * nano docker-compose.yml
      
        version: '3'
        services:
            db:
                build: ./db
                environment:
                MYSQL_DATABASE: semi1
                MYSQL_ROOT_PASSWORD: 12345
                MYSQL_USER: susel
                MYSQL_PASSWORD: 12345
                DATABASE_HOST: db
            web:
                build: ./web
                environment:
                DATABASE_HOST: db
                MYSQL_PORT: 3306
                MYSQL_DATABASE: semi1
                MYSQL_USER: susel
                MYSQL_PASSWORD: 12345
                ports:
                    - "3257:3257"
                depends_on:
                    - db
            restart: on-failure 
      
