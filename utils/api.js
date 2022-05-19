import { auth } from './firebase';

export function reautenticate(password) {
    const user = auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(credentials);
}
