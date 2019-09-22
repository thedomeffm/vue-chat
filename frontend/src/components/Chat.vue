<template>
    <div class="box" id="chat">
        <div v-if="messages !== []">
            <b-message v-for="(msg, index) in messages"
                       :key="index"
                       :class="hasType(msg)">
                <span v-if="msg.username">{{ msg.username }}: </span>
                {{ msg.content }}
            </b-message>
        </div>
        <div v-else>
            <b-message>
                No message(s).
            </b-message>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chat',
    props: {
        messages: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        hasType(msg) {
            // eslint-disable-next-line
            if (msg.hasOwnProperty('type')) {
                return msg.type;
            }
            // eslint-disable-next-line
            return '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .message:not(:last-child) {
        margin-bottom: 0.5em;
    }
    #chat {
        background-color: rgba(245,245,245,0.36);
        max-height: 40em;
        overflow: hidden;
        overflow-y:scroll;
    }
</style>
