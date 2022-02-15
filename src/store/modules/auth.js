// import { login, register } from '@/shared/api/Authentication';
// import { getUserGroups } from '@/shared/api/Users';
import { stringToJSON } from '../../common/helpers/JSONHelper';

export const _LSKEYS = {
  accessToken: 'access_token_',
  user: 'user_',
}

const state = {
  access_token: localStorage.getItem(_LSKEYS.accessToken),
  user: stringToJSON(localStorage.getItem(_LSKEYS.user), {}),
};

const getters = {
  token: (state) => state.access_token,
  user: (state) => state.user,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.access_token = token;
    localStorage.setItem(_LSKEYS.accessToken, token);    
  },
  SET_USER: (state, user) => {
    state.user = user;
    localStorage.setItem(_LSKEYS.user, user);    
    // Cookies.set(USER_COOKIES.user_data, JSON.stringify(payload));
  },
  CLEAR_TOKEN(state) {
    localStorage.removeItem(_LSKEYS.accessToken);
    state.access_token = null;
  },
  CLEAR_USER(state) {
    localStorage.removeItem(_LSKEYS.user);
    state.user = null;
  },
};

const actions = {
  /**
   * UNDER CONSTRUCTION
   * store action that calls the event register API
   * and store token to the localStorage and vuex
   */
  // register: (context, { data, onSuccess, onError, onDone } = {}) => {
  //   // register post request
  //   register(data)
  //     // register successs
  //     .then((response) => {
  //       // console.log(response.data)
  //       context.commit('SET_TOKEN', response.data.data.token);
  //       context.commit('SET_USER', response.data.data.user);

  //       if (typeof onSuccess === 'function') onSuccess(response);
  //     })
  //     // register error
  //     .catch((error) => {
  //       console.error('login', error);
  //       if (typeof onError === 'function') onError(error);
  //     })
  //     // register done
  //     .then((response) => {
  //       if (typeof onDone === 'function') onDone(response);
  //     });
  // },

  /**
   * store action that calls the event login API
   * and store token to the localStorage and vuex
   */
  login: (context, { data, onSuccess, onError, onDone} = {}) => {
    
    const { username, password } = data;
    if (username === 'user' && password === 'password') {
      context.commit('SET_TOKEN',  '1231434');
      onSuccess();
    } else {
      onError();
    }
    if (typeof onDone === 'function') {
      onDone();
    }
    // login post request
    // login(data)
    //   // login success
    //   .then(async (response) => {
    //     const expireAt = persistTill || '';
    //     context.commit('SET_TOKEN', {
    //       token: response.data.token.accessToken,
    //       expiration: expireAt,
    //     });

    //     // Single Role from previous implementation
    //     let userGroup = [];
    //     if (response.data.user.user_group_id) {
    //       const userGroups = await getUserGroups();
    //       const hasUserGroup = userGroups.data.find(
    //         (userGroup) => userGroup.id === response.data.user.user_group_id
    //       ).name;
    //       if (hasUserGroup) {
    //         userGroup.push(hasUserGroup);
    //       }
    //     }
    //     // Multi role
    //     const userGroups = response.data.user.groups.map(
    //       (group) => group?.name
    //     );
    //     const user = {
    //       ...response.data.user,
    //       user_group: userGroup || 'buyer', // this will be discared later on
    //       userGroups: [...userGroup, ...userGroups], //this will be the new implementation
    //     };
    //     context.commit('SET_USER', user);
    //     if (typeof onSuccess === 'function') onSuccess(response);
    //   })
    //   // login error
    //   .catch((error) => {
    //     console.error('login', error);
    //     if (typeof onError === 'function') onError(error);
    //   })
    //   // login done
    //   .then((response) => {
    //     if (typeof onDone === 'function') onDone(response);
    //   });
  },

  /**
   * UNDER CONSTRUCTION
   * store action that calls the event logout API
   * and remove  token from the localStorage and vuex
   */
  async logout(context, { onLogout }) {
    await context.commit('CLEAR_TOKEN');
    await context.commit('CLEAR_USER');
    onLogout();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
