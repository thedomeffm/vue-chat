import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: '',
        id: '',
        // lobby: '',
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setId(state, id) {
            state.id = id;
        },
        /* setLobby(state, lobby) {
            state.lobby = lobby;
        }, */
    },
    actions: {
        setUsername({ commit }, username) {
            commit('setUsername', username);
        },
        setId({ commit }, id) {
            commit('setId', id);
        },
        /* setLobby({ commit }, lobby) {
            commit('setLobby', lobby);
        }, */
    },
    getters: {
        username: state => state.username,
        id: state => state.id,
        // lobby: state => state.lobby,
    },
});
