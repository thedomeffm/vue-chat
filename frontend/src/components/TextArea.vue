<template>
    <div class="box">
        <b-input v-model="content"
                 @keyup.native.enter="emit"
                 class="chat-text"
                 type="textarea"/>
        <button @click="emit"
                class="button is-fullwidth is-primary"
                :disabled="disabledSend">
            Senden
        </button>
    </div>
</template>

<script>
export default {
    name: 'TextArea',
    data() {
        return {
            content: '',
        };
    },
    computed: {
        disabledSend() {
            if (!this.content) {
                return true;
            }
            return false;
        },
    },
    methods: {
        emit() {
            this.$emit('enter', this.content);
            this.content = '';
        },
    },
};
</script>

<style scoped>
    .chat-text {
        margin-bottom: 0.5em;
    }
</style>
