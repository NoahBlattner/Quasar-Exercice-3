<template>
	<q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} dish</div>
    </q-card-section>

    <q-card-section>

    	<div class="row q-mb-md">
	      <q-input
	      	filled
	      	v-model="dish.name"
	      	label="Name (Burger)"
          :rules="[(val) => val.length <= 20 || 'Maximum of 20 characters !', (val) => val.length > 0 || 'Cannot be empty !']"
          ref="name"
	      	class="col" />
    	</div>

    	<div class="row q-mb-md">
    		<q-input
		      filled
		      v-model="dish.description"
		      label="Description"
          :rules="[val => val.length <= 135 || 'Maximum of 135 characters !']"
          ref="description"
		      type="textarea"
		      class="col" />
    	</div>

    	<div class="row q-mb-md">
	      <q-input
	      	filled
	      	v-model="dish.image"
	      	label="Image URL"
	      	class="col" />
	      <q-img
          :src="dish.image ? dish.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain />
    	</div>

    	<div class="q-mb-md">
    		<div class="row">
					<p class="q-mb-none">Rating:</p>
    		</div>
				<div class="row">
	    		<q-rating
			      v-model="dish.rating"
			      size="2em"
			      color="orange" />
				</div>
    	</div>

    </q-card-section>

    <q-card-actions align="right">
      <q-btn
      	label="Annuler"
      	color="grey"
      	v-close-popup />
      <q-btn
      	label="Sauver"
      	color="primary"
        @click="submitForm"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapActions} from 'vuex'
	export default {
		props: {
      action: {
        default: 'add'
      },
      dishToUpdate: {
        type: Object
      }
    },
		data() {
			return {
				dish: {
          id: null,
					name: '',
					description: '',
					rating: 1,
					image: ''
				}
			}
		},
    methods: {
      ...mapActions('dishes', ['AC_AddDish', 'AC_UpdateDish']),
      submitForm() {
        this.$refs.name.validate()
        this.$refs.description.validate()

        if (!this.$refs.name.hasError && !this.$refs.description.hasError) {
          this.$emit('close')

          if (this.action === 'add') {
            this.saveDish()
          } else if (this.action === 'update') {
            this.AC_UpdateDish(this.dish)
          }

        }
      },
      saveDish() {
        this.AC_AddDish(this.dish)
      }
    },
    mounted () {
      if (this.action === 'update') {
        this.dish = this.dishToUpdate
      }
    }
	}
</script>

<style>
	.form-card {
		min-width: 400px;
	}
	.form-card .heading {
		text-transform: capitalize;
	}
	.form-card .q-card-section {
		width: 100%;
	}
	.thumbnail {
		max-width: 50px;
		max-height: 50px;
	}
	.form-card .q-img {
		height: 56px;
		width: 56px;
		border-radius: 10px;
	}
	.form-card .q-img__image {
		background-size: cover !important;
	}
	.form-card .q-rating__icon {
		opacity: 0.2;
	}
	.form-card .q-rating__icon--active {
		opacity: 1;
	}
</style>
