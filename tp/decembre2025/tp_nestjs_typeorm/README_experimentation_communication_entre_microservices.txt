1) installer un serveur Kafka (via "Windows WSL2 + Docker + Docker_compose" ou autre)
2) développer deux applications avec nestJs
3) faire communiquer les deux backends(microservices) via Kafka 
   et l'api de connexion à Kafka (ou autre) intégrée à nestJs (NestFactory.createMicroservice)
   selon la documentation de référence (https://docs.nest-js.fr/microservices/kafka) ou bien d'autres exemples disponibles sur internet
================
mode opératoire :
https://www.telerik.com/blogs/how-to-integrate-kafka-nestjs-event-driven-microservices (à adapter , source d'inspiration)
================
exemple de config docker/docker-compose pour Kafka:
https://github.com/didier-mycontrib/msa-vagrant
et partie with-wsl2\dock-conf\Kafka (à lancer sous linux ou bien wsl2)
================
Exemple de connexion directe à Kafka depuis nodeJs (sans nestJs): 
https://github.com/didier-mycontrib/tp_node_js , partie essais_kafka