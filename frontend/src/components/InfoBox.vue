<template>
    <div v-if="!!username" class="box">
        <p>
            <b>Username:</b> {{ username }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'InfoBox',
    computed: {
        ...mapGetters([
            'username',
            // 'lobby',
            // ...
        ]),
    },
};
</script>

<style scoped>

</style>
