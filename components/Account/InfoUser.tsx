import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { View, Text } from '../Themed';

export default function InfoUser(props: { userInfo: any; setLoading: any; setLoadingText: any }) {
    const {
        userInfo: { photoURL, displayName, email },
    } = props;

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : require('../../assets/img/avatar-default.jpg')}
            />
            <View>
                <Text style={displayName}>{displayName ? displayName : 'Anónimo'}</Text>
                <Text>{email ? email : 'Social Login'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar: {
        marginRight: 10,
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5,
    },
});
