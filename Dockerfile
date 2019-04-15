FROM java:8-jre-alpine
WORKDIR /usr/src/innodox-homework/bin

EXPOSE 8080

COPY ./target/InnodoxHomework-1.0.0-SNAPSHOT.jar /usr/src/innodox-homework/bin

CMD ["java", "-jar",  "InnodoxHomework-1.0.0-SNAPSHOT.jar"]
