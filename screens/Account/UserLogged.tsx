import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';
import { auth } from '../../utils/firebase';
import { View } from '../../components/Themed';

export default function UserLogged() {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        (() => {
            const user = auth.currentUser;
            setUserInfo(user);
        })();
        setReloadUserInfo(false);
    }, [reloadUserInfo]);

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} setLoading={setLoading} setLoadingText={setLoadingText} />}
            {userInfo && (
                <AccountOptions
                    userInfo={userInfo}
                    setLoading={setLoading}
                    setLoadingText={setLoadingText}
                    setReloadUserInfo={setReloadUserInfo}
                />
            )}
            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnSignOut}
                titleStyle={styles.btnTitleStyle}
                onPress={() => auth.signOut()}
            />

            <Loading isVisible={loading} text={loadingText} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
    },
    btnSignOut: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: 'red',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnTitleStyle: {
        color: 'white',
    },
});
