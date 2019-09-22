<template>
    <div class="container">
        <div class="columns">
            <div class="column is-3">
                <h1 class="title is-1">
                    Vue-Chat
                </h1>
                <b-field label="Choose a Name">
                    <b-input @keyup.native.enter="save" v-model="username" />
                </b-field>
                <div v-if="error" class="error">
                    Please set data
                </div>
                <button @click="save" class="button is-primary">
                    Weiter
                </button>
            </div>
            <div class="column">
                :)
            </div>
        </div>
        <div class="column">
            <info-box />
        </div>
    </div>
</template>

<script>
import InfoBox from '../components/InfoBox.vue';

export default {
    name: 'Lobby',
    components: { InfoBox },
    data() {
        return {
            username: '',
            error: false,
        };
    },
    methods: {
        save() {
            if (!this.username) {
                this.error = true;
            } else {
                this.error = false;
                this.$store.dispatch('setUsername', this.username);
                this.$router.push({ name: 'room' });
            }
        },
    },
};
</script>

<style scoped>
  .lobby {
    width: 50em;
    background-color: #e7e7e7;
  }
</style>
