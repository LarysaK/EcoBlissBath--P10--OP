# À propos de Eco Bliss Bath
Une start-up spécialisée dans la vente de produits de beauté écoresponsables dont le produit principal est un savon solide

## Objectif
* Analyser les besoins en automatisation de tests
* Automatiser des tests via des scripts
* Rédiger un bilan de tests automatisés

## Installation du projet
1. Téléchargez ou clonez le dépôt 
```bash
git clone https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne.git
```

2. Depuis un terminal ouert dans le dossier du projet, lancer la commande :
```bash
docker-compose up
```

3. Lancez le Frontend
```bash
npm install
npm start
```

4. Installer / Ouvrir Cypress
```bash
npm install cypress --save-dev
npx cypress open
```

5. Ouvrez le site depuis la page [localhost:8080](http://localhost:8080)
6. Lien vers [Swagger](http://localhost:8081/api/doc)
7. Login
   
Identifiant: test2@test.fr

Mot de passe: testtest


## Tests
Smoke tests :

1.Vérifiez la présence des champs et boutons de connexion
2. Vérifiez la présence des boutons d’ajout au panier quand vous êtes connecté
3. Vérifiez la présence du champ de disponibilité du produit

Test API : 
GET

* Requête sur l’accès au panier d’un utilisateur avant connexion pour vérifier que je reçois une erreur. http://localhost:8081/orders qui renvoie 2 types d’erreurs 401 si l’utilisateur essaye d’accéder au panier en n’étant pas connecté. Et 403 si l’utilisateur connecté essaye d’accéder au panier mais qu’il ne dispose pas des droits suffisants pour y accéder.

* Requête sur la liste des produits contenus dans un panier, accessible une fois connecté http://localhost:8081/orders qui renvoie la liste des produits contenus dans le panier

* Requête d’une fiche produit spécifique en fonction de l’id du produit http://localhost:8081/products/{id} doit retourner la fiche du produit, l’id du produit doit être spécifier et renvoie un status 200

POST

* Requête sur la connexion d’un utilisateur existant en base de données http://localhost:8081/login doit retourner un status 200. Les données suivantes peuvent être utilisés pour la réussite du test : username : “test2@test.fr” password: “testtest”

* Requête sur la connexion d’un utilisateur n’existant pas en base de données http://localhost:8081/login doit retourner une erreur 401. Les données de votre choix peuvent être utilisé pour la réalisation du test

* Ajouter un produit disponible au panier http://localhost:8081/orders/add doit retourner un status 201 si le produit à bien été ajouter au panier.

* Ajouter un produit en rupture de stock http://localhost:8081/orders/add doit retourner une erreur 403 car il n’est possible d’accéder à la ressources. Le produit étant en rupture de stock

* Ajouter un avis http://localhost:8081/reviews doit retourner une réponse 201 si l’avis à bien été ajouter en base de données

Test fonction :

1. Connexion
2. Pannier (Ajout de prdouit, verififcation des stocks, limite)

## Lien vers CYPRESS documentation
[Cypress](https://www.cypress.io/)




