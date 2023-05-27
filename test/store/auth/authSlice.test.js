import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('pruebas en el authSlice', () => {
  test('debe regresar el estado inicial y llamarse auth', () => {
    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('debe realizar la autenticacion', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });
  test('debe realziar el logout sin argumentos', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test('debe realziar el logout y mostrar un mensaje de error', () => {
    const error = 'las credenciales no son correctas';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage: error }));
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: error,
    });
  });
  test('debe cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe('checking');
  });
});
