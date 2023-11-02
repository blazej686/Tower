<template>
    <router-link :to="{name: 'Event', params: { eventId: eventProp.id}}">
    <div class='col-12-md-3 card shadow my-3'>
            <img class="image-fluid rounded" :src='eventProp.coverImg' alt='Event Photo'>
            <p>{{ eventProp.name }}</p>
        </div>
    </router-link>

    
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