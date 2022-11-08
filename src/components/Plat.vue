<template>
	<q-card
		class="card">
    <q-img
      :src="dish.image ? dish.image : 'statics/image-placeholder.png'"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ dish.name }}
      </div>
    </q-img>

		<q-card-section>
      <q-rating
        :value="dish.rating"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section
      decoration="">
      <p v-if="dish.description.length">{{ dish.description }}</p>
      <em v-else>No description given.</em>
    </q-card-section>

    <q-card-actions
    	class="absolute-bottom"
      align="around">
      <q-btn
      	@click="showUpdateForm = true"
      	icon="edit"
      	color="blue"
      	flat>Update</q-btn>
      <q-btn
        @click="requestDelete(dish.id)"
      	icon="delete"
      	color="red"
      	flat>Delete</q-btn>
    </q-card-actions>

    <q-dialog
    	v-model="showUpdateForm">
      <form-plat @close="showUpdateForm = false" action="update" :dishToUpdate="dish"/>
    </q-dialog>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dish: {
      required: true
    }
  },
  data() {
    return {
      showUpdateForm: false,
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
  .italic {

  }
</style>
