<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GrinderScale } from '../types/GrindersScale'

const props = defineProps<{
  editingGrinderScale?: GrinderScale | null
}>()

const emit = defineEmits<{
  add: [grinderScale: string]
  update: [tasting: GrinderScale]
  cancel: []
}>()

const grinderScale = ref('')
const formError = ref('')

watch(
  () => props.editingTasting,
  (grinderscale) => {
    formError.value = ''
    if (grinderscale) {
      grinderScale.value = grinderScale.title
    } else {
      grinderScale.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!grinderScale.value.trim()) {
    formError.value = 'Please provide a grinder/scale.'
    return
  }

  if (props.editingTasting) {
    emit('update', {
      ...props.editingTasting,
      grinderScale: grinderScale.value.trim(),
    })
  } else {
    emit(
      'add',
      grinderScale.value.trim(),
    )
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="grinder-scale">Grinder/Scale:</label>
      <input 
        id="grinder-scale" 
        v-model="grinderScale" 
        type="text" 
        class="form-input" 
        placeholder="Grinder 1" 
        required
      >
    </div>

    <p v-if="formError" class="form-error">{{ formError }}</p>

    <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
      <button type="submit" class="button-primary">
        {{ editingTasting ? 'Save Changes' : '+ Announce Tasting' }}
      </button>

      <button 
        v-if="editingTasting" 
        type="button" 
        class="back-link" 
        @click="emit('cancel')"
      >
        Cancel Edit
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-error {
  color: #ff6b6b;
  font-weight: bold;
}
</style>