<template>
	<q-card
		class="card">
    <q-img
      :src="plat.image"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ plat.nom }}
      </div>
    </q-img>

		<q-card-section>
      <q-rating
        :value="plat.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section>
      {{ plat.description }}
    </q-card-section>

    <q-card-actions
    	class="absolute-bottom"
    	align="right">
      <q-btn
      	@click="afficherFormPlat = true"
      	icon="edit"
      	color="blue"
      	flat>Modifier</q-btn>
      <q-btn
        @click="requestDelete(plat.id)"
      	icon="delete"
      	color="red"
      	flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog
    	v-model="afficherFormPlat">
      <form-plat action="modifier" />
    </q-dialog>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    plat: {
      required: true
    }
  },
  data() {
    return {
      afficherFormPlat: false,
      showDeleteConfirmation: false
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  },
  methods: {
    ...mapActions('dishes', ['AC_DeleteDish']),
    requestDelete(dishId) {
      this.$q.dialog({
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete this dish ?',
        cancel: true,
        ok: 'Delete',
        persistent: true
      }).onOk(() => {
        this.AC_DeleteDish(dishId)
      })
    }
  }
}
</script>

<style>
	.card {
		min-height: 400px;
		max-width: 250px;
		width: 250px;
		transition: background 0.3s;
	}
	.card-clickable {
		cursor: pointer;
	}
	.card-clickable:hover {
		background: #bdbdbd!important;
	}
	.card .q-img {
		max-height: 180px;
	}
	.card .q-img__image {
		background-size: cover !important;
	}
	.card .q-rating__icon {
		opacity: 0.2;
	}
	.card .q-rating__icon--active {
		opacity: 1;
	}
</style>
