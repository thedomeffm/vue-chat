<template>
    <div class="box">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>
                        Room
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in RoomList" :key="room.id">
                    <td>
                        <b>{{ room.name }}</b>
                    </td>
                    <td>
                        <button @click="$emit('click', room.id)"
                                :disabled="isCurrentRoom(room.id)"
                                class="button is-success">
                            Join
                        </button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
export default {
    name: 'RoomList',
    props: {
        RoomList: {
            type: Array,
            default: () => [],
        },
        currentRoom: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        isCurrentRoom(roomId) {
            if (this.currentRoom.id === roomId) {
                return true;
            }
            return false;
        },
        short(id) {
            return `R-${id.slice(-6)}`;
        },
    },
};
</script>

<style scoped>

</style>
