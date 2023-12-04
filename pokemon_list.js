const mapPokemonInfo = (pokemon_info) => {
    const new_pokemon_info = {
        name: '',
        abilities: [],
        types: [],
        stats: [],
        sprites: {
            front_default: ''
        }
    };

    new_pokemon_info.sprites.front_default = pokemon_info.sprites.front_default
    new_pokemon_info.name = pokemon_info.name
    new_pokemon_info.abilities = pokemon_info.abilities
    new_pokemon_info.types = pokemon_info.types
    new_pokemon_info.stats = pokemon_info.stats

    return new_pokemon_info
}

const cardBodyButtonHandle = (pokemon_info) => {
    const new_pokemon_info = mapPokemonInfo(pokemon_info)

    window.localStorage.setItem('selected_pokemon', JSON.stringify(new_pokemon_info))

    $('#loader-countainer').show();
    $('#content').load('pokemon_view.html', function () {
        $('#loader-countainer').hide();
    })
}

const insertPokemons = () => {
    $('#loader-countainer').show();
    const pokemons_info = JSON.parse(window.localStorage.getItem('pokemons_info')) || []

    if (!(pokemons_info.length > 0)) {
        const result = [];
        fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0').then(res => {
            return res.json()
        }).then(data => {
            const pokemons = data.results
            pokemons.map(pokemon => {
                fetch(pokemon.url).then(res => {
                    return res.json()
                }).then(data => {
                    const pokemon_info = data
                    const new_pokemon_info = mapPokemonInfo(pokemon_info)
                    result.push(new_pokemon_info);
                    window.localStorage.setItem('pokemons_info', JSON.stringify(result))
                }).catch(err => console.log(err))
            })
        }).catch(err => console.log(err))
    }


    const container = document.querySelector('.container')

    pokemons_info.forEach(pokemon_info => {
        //card elements
        cardDiv = document.createElement('div')
        cardDiv.className = 'card'

        //card head
        cardHead = document.createElement('div')
        cardHead.className = 'card-head'

        //card image
        cardImage = document.createElement('img')
        cardImage.src = pokemon_info.sprites.front_default ? pokemon_info.sprites.front_default : 'assets/pikachu.png'
        cardImage.alt = pokemon_info.name ? pokemon_info.name : 'pokemon image'
        cardImage.setAttribute('width', '200px')

        //card body
        cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        bodyP = document.createElement('p')
        bodyP.innerText = pokemon_info.name ? pokemon_info.name : 'pokemon name'

        bodyButton = document.createElement('button')
        bodyButton.innerText = "go!"
        bodyButton.addEventListener('click', () => cardBodyButtonHandle(pokemon_info))

        //insert all elements needed
        cardHead.insertBefore(cardImage, cardHead.lastChild)
        cardBody.insertBefore(bodyButton, cardBody.lastChild)
        cardBody.insertBefore(bodyP, cardBody.lastChild)
        cardDiv.insertBefore(cardBody, cardDiv.lastChild)
        cardDiv.insertBefore(cardHead, cardDiv.lastChild)

        container.insertBefore(cardDiv, container.lastChild)
    })
    $('#loader-countainer').hide();
}

insertPokemons()