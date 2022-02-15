import store from '../../store';

export function routeGuard(to, from, next) {
  const token = store.getters['auth/token'];
  // auth page: proceed after checking
  if (to.name === 'Login' && token) {
    next({ name: 'Dashboard' });
  } else if (!!to.meta[authenticatedMetaKey] && !token) {
    next({ name: 'Login' });
    // const { personas, roles } = to.meta.permissions;
    // if (!token) {
    //   return next({ name: 'Login' });
    // } else if (
    //   user &&
    //   (!personas.includes(user.persona) || !isRoleAllowed(roles))
    // ) {
    //   if (user.persona !== null) {
    //     return next({ name: 'Error404' });
    //   }
    // }
    // if (token && user && !to.meta.layout) {
    //   to.meta.layout = getPersona().layout;
    // }
  }
  // public page: proceed normally
  next();
}

export const authenticatedMetaKey = '_authenticated';