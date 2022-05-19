import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../utils/firebase';

export default function InfoUser(props) {
    const {
        userInfo: { photoURL, displayName, email, uid },
        setLoading,
        setLoadingText,
    } = props;

    const showAlert = (message) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCameraRoll = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionsCameraRoll === 'denied') {
            showAlert('Es necesario aceptar los permisos de la galería de fotos.');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                uploadImage(result.uri)
                    .then(() => {
                        updatephotoURL();
                    })
                    .catch((err) => {
                        showAlert('Ocurrió un error al actualizar la imagen del avatar.');
                    });
            }
        }
    };

    const uploadImage = async (uri) => {
        setLoadingText('Actualizando Avatar');
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };

    const updatephotoURL = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response,
                };
                await auth.currentUser!.updateProfile(update);
                setLoading(false);
            })
            .catch((err) => {
                showAlert('Ocurrió un error al actualizar la imagen del avatar.');
                setLoading(false);
            });
    };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                // showEditButton
                // onEditPress={changeAvatar}
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
        backgroundColor: '#f2f2f2',
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
