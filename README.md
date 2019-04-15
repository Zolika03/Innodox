# Innodox
Homework

Használata:
application.properties fileban be kell állítani a DB elérését

Backend start:
> mvn clean install


> java -jar target/InnodoxHomework-1.0.0-SNAPSHOT.jar

Frontend start:
> cd angular

> npm install

> npm run start

Dockerres használat:
Backend:

> mvn clean install

> docker build -f Dockerfile -t innodox-homework . 


Frontend:
> cd angular

> npm install

> npm run build

Futattás:

Visszalépve a gyökérkönyvtárba:

> docker-compose up -d 


