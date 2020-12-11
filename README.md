# Webcam
## Ziel
Erstellung einer Software (Backend und Frontend) zu einer Webcam.
## Architektur
* Es gibt eine index.html die mittels HTML und Javascript das Frontend darstellt und vom RESTful backend die Bilder zieht.
* Es gibt eine index.js welche mittels node das backend hochzieht und die Bilder der Webcam ueber REST anbietet.
* Ueber "config" kann der Pfad zu den Bildern der Webcam gesteuert werden.
* In Produktion kopiert die Webcam selbsttaetig einen Snapshot alle 60 Sekunden in ein FTP-Verzeichnis. Dieses Verzeichnis ist das selbe, wie in config/default.json mit "pictures.source.directory" angegeben. 
* Das Verzeichnis "pictures.source.directory" kann von node gelesen werden und liegt im gleichen Dateisystem.
* Zur Entwicklung existieren Beispiel-Bilder unter "/sample", welches damit das FTP-Verzeichnis simuliert.
## Operation
* Die Anwendung wird in einem Docker Container betrieben, der zugleich FTP-Server und ist und Node.js ausführen kann. Momentan noch ohne FTP.

## Launch at development

    > npm start

## Usage in production

    > docker build --pull --rm -f Dockerfile -t webcam:latest

    > docker run --rm -it  -p 80:80/tcp webcam:latest