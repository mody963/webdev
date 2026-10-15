<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GrinderScale } from '../types/GrindersScale'

const props = defineProps<{
  editingGrinderScale?: GrinderScale | null
}>()

const emit = defineEmits<{
  add: [grinderScale: string]
  update: [GrinderScale: GrinderScale]
  cancel: []
}>()

const new_GrinderScale = ref('')
const formError = ref('')

watch(
  () => props.editingGrinderScale,
  (grinder) => {
    formError.value = ''
    if (grinder) {
      new_GrinderScale.value = grinder.grinderScale
    } else {
      new_GrinderScale.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!new_GrinderScale.value.trim()) {
    formError.value = 'Please provide a grinder/scale.'
    return
  }

  if (props.editingGrinderScale) {
    emit('update', {
      ...props.editingGrinderScale,
      grinderScale: new_GrinderScale.value.trim(),
    })
  } else {
    emit(
      'add',
      new_GrinderScale.value.trim(),
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
        v-model="new_GrinderScale" 
        type="text" 
        class="form-input" 
        placeholder="Grinder 1" 
        required
      >
    </div>

    <p v-if="formError" class="form-error">{{ formError }}</p>

    <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
      <button type="submit" class="button-primary">
        {{ editingGrinderScale ? 'Save Changes' : '+ Announce Tasting' }}
      </button>

      <button 
        v-if="editingGrinderScale" 
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