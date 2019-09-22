<template>
    <div class="box">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        Username
                    </th>
                    <th>
                        Room
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in UserList" :key="user.id">
                    <td>
                        <b>{{ user.username || short(user.id) }} </b>
                        <span v-if="user.id === id">(you)</span>
                        <br>
                    </td>
                    <td>
                        {{ getRoomNameById(user.currentRoom) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'UserList',
    props: {
        UserList: {
            type: Array,
            default: () => [],
        },
        RoomList: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapGetters([
            'username',
            'id',
        ]),
    },
    methods: {
        short(id) {
            return `${id.slice(-8)}`;
        },
        getRoomNameById(roomId) {
            const x = this.RoomList.find((obj) => {
                return obj.id === roomId;
            });
            return x.name;
        },
    },
};
</script>

<style scoped>

</style>
