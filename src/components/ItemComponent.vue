<script setup>

defineProps({
    'item': {
        type: Object,
        required: true
    }
})


</script>
<template>
  <div class="item">
    <img :src="item.poster_path" alt="poster" />
    <h3>{{ item.title }}</h3>
    <p>{{ item.overview }}</p>
  </div>
</template>