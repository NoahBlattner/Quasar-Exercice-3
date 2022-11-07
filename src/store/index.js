import Vue from 'vue'
import Vuex from 'vuex'

// Importation du module Vuex de la solution sous le namespace solutionPlats
import solutionPlats from './Solution/store-plats'
import dishes from './store-plat'
// Importer votre module ici et l'ajouter au Store (ligne 19)

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      solutionPlats,
      dishes
      // Votre module ici (mettre une virgule à la fin de la ligne 18)
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
