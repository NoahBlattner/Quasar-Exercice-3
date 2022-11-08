<template>
  <q-page class="q-pa-lg">
  	<div class="row q-gutter-lg">

			<plat
				v-for="plat in plats"
				:key="plat.id"
				:plat="plat" />

	    <bouton-ajouter
	    	@click="showUpdateForm = true" />

	    <q-dialog
	    	v-model="afficherFormPlat">
        <form-plat
        	@close="showUpdateForm = false"
        	action="ajouter" />
      </q-dialog>

  	</div>
  </q-page>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
	  data() {
	  	return {
	  		showUpdateForm: false
	  	}
	  },
	  computed: {
	  	...mapGetters('solutionPlats', ['plats'])
	  },
	  components: {
	  	'plat' : require('components/Solution/Plat.vue').default,
	  	'bouton-ajouter' : require('components/Solution/BoutonAjouter.vue').default,
	  	'form-plat' : require('components/Solution/FormPlat.vue').default
	  }
	}
</script>
