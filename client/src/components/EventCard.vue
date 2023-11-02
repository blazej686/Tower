<template>
    <div class='col-12-md-3 card shadow my-3'>
        <img src='' alt=''>
        <p>{{ eventProp }}</p>
      </div>

    
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent.js';
export default {
    props: { eventProp: {type: TowerEvent, required: true}},

    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>