function getPokemon(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
        callback(req.responseText);
    });
    req.send(null);
}

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let pokemon_id = e.target.elements.id_query.value
    getPokemon("https://pokeapi.co/api/v2/pokemon/" + pokemon_id, function(response) {
        var pokemon = JSON.parse(response);
        showPokemonData(pokemon);
  
        var skill_query = pokemon.abilities[0].ability.name
        getPokemon("https://pokeapi.co/api/v2/ability/" + skill_query, function(responseSkill) {
            var pokemon_skill = JSON.parse(responseSkill);
            showRelatedPokemon(pokemon_skill);
        });
    });
});

function showPokemonData(pokemon) {
    let pokemon_data = document.getElementById("pokemon_data");
    pokemon_data.innerHTML = "";
  // Nombre
    let name = document.createElement("p");
    name.textContent = "Nombre: " + pokemon.name;
    pokemon_data.appendChild(name);
  // Peso
    let weigth = document.createElement("p");
    weigth.textContent = "Peso: " + pokemon.weight;
    pokemon_data.appendChild(weigth);
  // Altura
    let height = document.createElement("p");
    height.textContent = "Altura: " + pokemon.height;
    pokemon_data.appendChild(height);
  // Foto
    let photo = document.createElement("img");
    photo.src = pokemon.sprites.front_default;
    photo.style.height = "200px";
    photo.style.width = "200px";
    pokemon_data.appendChild(photo);
  // Habilidad
    let skill = document.createElement("p");
    skill.textContent = "Habilidad: " + pokemon.abilities[0].ability.name;
    pokemon_data.appendChild(skill);
  }

function showRelatedPokemon(pokemon_skill){
    let skill_related = document.getElementById("related_pokemon");
    skill_related.innerHTML = "";
    let title = document.createElement("p");
    title.textContent = "Pokemones que comparten esta habilidad";
    skill_related.appendChild(title);
    // Pokemon A
    let pokemon_a = document.createElement("p");
    pokemon_a.textContent = "Pokemon 1: " + pokemon_skill.pokemon[1].pokemon.name;
    skill_related.appendChild(pokemon_a);
    // Pokemon A
    let pokemon_b = document.createElement("p");
    pokemon_b.textContent = "Pokemon 2: " + pokemon_skill.pokemon[2].pokemon.name;
    skill_related.appendChild(pokemon_b);
  }