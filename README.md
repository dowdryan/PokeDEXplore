============================================================================================================================================
Title: PokeDEXplore

Functionality: Lists every pokemon and their data. Users can sort and favorite pokemon.

API used: PokeApi (https://pokeapi.co/)

Features: Form Changing. Many pokemon have different forms (some very well known) and it wouldn't feel right to exclude them.

Tests: Located in the corresponding files. Run ```npm test```

User Flow: 
    - Run ```npm start``` in the react folder to set up the site. 
      - If you wish to favorite pokemon, you need to run ```node server.js``` in the express folder. 
    - The homepage("/") serves as a grander pokedex, that lists each of the available. 
      - Users can search for a pokemon or sort them at the top of the page (alphabetically, reverse alphabetically, ascending, descending). 
    - Clicking on a pokemon will bring them to their page ("/name of pokemon goes here"). 
      - You can either click on the pokemon, or search for their name in the search bar or url manually.
    - At the top of each pokemon's page is an option to favorite them.
    - If the pokemon has multiple different forms, there will be a drop down menu that will switch the pokemon's sprite (currently does not change the pokemon's typing, ability, etc. when the form changes).
    - At the top of the page, users can click either previous to visit the previous pokemon's page, or next to visit the next pokemon's page. For instance:
    - Clicking previous on Ivysaur's page will bring the user to Bulbasaur's page
    - Clicking next on Ivysaur's page will bring the user to Venusaur's page

My Own API:
    - Upon checking the favorite box for a specific pokemon, it sends the favorited pokemon's name and id to "/api/add-favorite" and stores them in "/api/user-favorites".
    - Upon unchecking the favorite box for a specific pokemon, it searches for the pokemon's name and id in "/api/user-favorites" and sends them to "/api/remove-favorite" to remove them from the API.

Tech Stacks:
    - Front End: 
    - Back End: 
    - Software needed: React, Node, Express