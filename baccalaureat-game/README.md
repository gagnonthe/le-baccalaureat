# Baccalauréat Game

## Description
Le projet "Baccalauréat Game" est un jeu multijoueur en ligne inspiré du Baccalauréat. Il permet à un présentateur de gérer le jeu, tandis que les joueurs peuvent participer en temps réel via une interface web. Le jeu utilise Flask pour le backend et WebSocket pour la communication en temps réel.

## Structure du projet
Le projet est organisé comme suit :

- **app/** : Contient le code de l'application.
  - **static/** : Contient les fichiers statiques (CSS, JavaScript).
    - **css/** : Styles pour les différentes pages.
    - **js/** : Scripts JavaScript pour la logique des pages.
    - **libs/** : Bibliothèques JavaScript utilisées dans le projet.
  - **templates/** : Modèles HTML pour les différentes pages.
  - **__init__.py** : Initialise l'application Flask.
  - **routes.py** : Définit les routes de l'application.
  - **sockets.py** : Gère les connexions WebSocket.
  - **game.py** : Contient la logique du jeu.

- **tests/** : Contient les tests unitaires pour l'application.

- **requirements.txt** : Liste des dépendances Python nécessaires.

- **run.py** : Point d'entrée de l'application.

- **.gitignore** : Fichiers et dossiers à ignorer par Git.

## Installation
1. Clonez le dépôt :
   ```
   git clone <url-du-dépôt>
   cd baccalaureat-game
   ```

2. Installez les dépendances :
   ```
   pip install -r requirements.txt
   ```

## Exécution
Pour démarrer l'application, exécutez :
```
python run.py
```

## Contribuer
Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.

## License
Ce projet est sous licence MIT.