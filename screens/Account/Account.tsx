import React, { useState } from 'react';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import { auth } from '../../utils/firebase';
import Loading from '../../components/Loading';

export default function Account() {
    const [login, setLogin] = useState<boolean | null>(null);

    auth.onAuthStateChanged((user) => {
        !user ? setLogin(false) : setLogin(true);
    });

    if (login == null) return <Loading isVisible={true} text="Cargando" />;
    return login ? <UserLogged /> : <UserGuest />;
}
