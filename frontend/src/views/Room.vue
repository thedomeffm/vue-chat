<template>
    <div class="container">
        <div class="columns">
            <div class="column is-8">
                <chat :messages="messages" />
                <text-area @enter="send"/>
            </div>
            <div class="column is-4">
                <room-list :room-list="roomList"
                           :current-room="room"
                           @click="joinRoom" />
                <user-list :user-list="userList"
                           :room-list="roomList"/>

                <div class="box">
                    <p>Connection: {{state}}</p>
                    <p>Room: {{room.name}}</p>
                </div>
                <div class="box">
                    <input v-model="createRoomName" type="text" class="input">
                    <br>
                    <br>
                    <button @click="createRoom" class="button is-primary is-fullwidth">
                        Create Room
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import io from 'socket.io-client';
import Chat from '../components/Chat.vue';
import RoomList from '../components/RoomList.vue';
import UserList from '../components/UserList.vue';
import TextArea from '../components/TextArea.vue';

export default {
    name: 'Room',
    components: {
        TextArea, RoomList, UserList, Chat,
    },
    data() {
        return {
            message: '',
            messages: [],
            usersCount: 0,
            state: false,
            room: {},
            roomList: [],
            userList: [],
            createRoomName: 'Examplename',
        };
    },
    computed: {
        ...mapGetters([
            'username',
            // 'lobby',
            // ...
        ]),
    },
    created() {
        if (this.$store.getters.username === ''
         || this.$store.getters.id === '') {
            this.$router.push({ name: 'lobby' });
        }
        this.socket = io.connect('http://localhost:1337');
    },
    beforeMount() {
        this.socket.emit('init', this.username);
    },
    mounted() {
        this.socket.on('current-room', (data) => {
            console.log('current-room', data);
            this.room = data;
        });
        this.socket.on('current-id', (id) => {
            console.log('current-id', id);
            this.$store.dispatch('setId', id);
        });
        this.socket.on('new-chat-message', (data) => {
            console.log('new-chat-message', data);
            if (this.messages.length >= 8) {
                this.messages.shift();
            }
            this.messages.push(data);
        });
        this.socket.on('update-room-list', (data) => {
            console.log('update-room-list', data);
            this.roomList = data;
        });
        this.socket.on('update-user-list', (data) => {
            console.log('update-user-list', data);
            this.userList = data;
        });
        this.socket.on('user-online', (data) => {
            console.log('user-online', data);
            this.usersCount = data;
        });
    },
    methods: {
        send(content) {
            this.socket.emit('chat-message', content);
            this.message = '';
        },
        createRoom() {
            this.socket.emit('create-room', this.createRoomName);
        },
        joinRoom(roomId) {
            this.socket.emit('join-room', roomId);
            console.log('join-room', roomId);
        },
    },
};
</script>

<style scoped>

</style>
