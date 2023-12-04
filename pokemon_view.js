const pokemon = JSON.parse(window.localStorage.getItem('selected_pokemon'))

document.getElementById('pokemon-image').src = pokemon.sprites.front_default
document.getElementById('pokemon-name').innerText = pokemon.name

abilities_list = document.getElementById('abilities-list')
pokemon.abilities.map(ability => {
    const li_ability = document.createElement('li')
    li_ability.innerText = ability.ability.name

    abilities_list.insertBefore(li_ability, abilities_list.lastChild)
})

types_list = document.getElementById('types-list')
pokemon.types.map(type => {
    const li_types = document.createElement('li')
    li_types.innerText = type.type.name

    types_list.insertBefore(li_types, types_list.lastChild)
})

stats_table = document.getElementById('stats-table')

const tr_table = document.createElement('tr')

const th_stat = document.createElement('th')
th_stat.innerText = 'stat'

const th_value = document.createElement('th')
th_value.innerText = 'value'

tr_table.insertBefore(th_value, tr_table.lastChild)
tr_table.insertBefore(th_stat, tr_table.lastChild)

stats_table.insertBefore(tr_table, stats_table.lastChild)
pokemon.stats.map(stat => {
    const tr = document.createElement('tr')
    const td_label = document.createElement('td')
    const td_value = document.createElement('td')

    td_label.innerText = stat.stat.name
    td_value.innerText = stat.base_stat + 'pts.'

    tr.insertBefore(td_value, tr.lastChild)
    tr.insertBefore(td_label, tr.lastChild)
    stats_table.insertBefore(tr, stats_table.lastChild)
})