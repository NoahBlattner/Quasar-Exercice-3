// State : données du magasin
const state = {
  dishes: [
    {
      id: 1,
      image : 'https://i.imgur.com/0umadnY.jpg',
      name : 'Burger',
      description : "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      rating : 4,
    },
    {
      id : 2,
      image : 'https://i.imgur.com/b9zDbyb.jpg',
      name : 'Pizza',
      description : "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      rating : 5,
    },
    {
      id: 3,
      image : 'https://i.imgur.com/RbKjUjB.jpg',
      name : 'Petits choux',
      description :
        "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
      rating : 1,
    },
    {
      id: 4,
      image : 'https://i.imgur.com/xAuhNVg.jpg',
      name : 'BBQ Ribs',
      description : "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
      rating : 5,
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  DELETE_DISH(state, payload) {
    state.dishes = state.dishes.filter(el => el.id !== payload)
  },
  ADD_DISH(state, payload) {
    state.dishes.push(payload)
  },
  UPDATE_DISH(state, payload) {
    state.dishes[payload.index] = payload.dish
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  AC_DeleteDish(context, payload) {
    context.commit('DELETE_DISH', payload)
  },
  AC_AddDish(context, payload) {
    if (state.dishes.length) {
      payload.id = Math.max(...state.dishes.map(task => task.id)) + 1
    }
    context.commit('ADD_DISH', payload)
  },
  AC_UpdateDish(context, payload) {
    const index = state.dishes.findIndex(el => el.id === payload.id)
    context.commit('UPDATE_DISH', {index, dish: payload})
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  dishes () {
    return state.dishes
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
