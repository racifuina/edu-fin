import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../../utils/firebase';

const showAlert = (message) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });

export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setError(null);
        if (!newDisplayName) {
            setError('Este campo es obligatorio');
        } else if (newDisplayName === displayName) {
            setError('El nombre no puede ser igual al actual');
        } else {
            setIsLoading(true);
            auth.currentUser!.updateProfile({ displayName: newDisplayName })
                .then((response) => {
                    setIsLoading(false);
                    setShowModal(false);
                    setReloadUserInfo(true);
                })
                .catch((err) => {
                    setIsLoading(false);
                    showAlert('Ocurrió un error al actualizar el nombre');
                });
        }
    };

    return (
        <View style={styles.view}>
            <Input
                placeholder="Nombre y Apellido"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2',
                }}
                defaultValue={displayName || ''}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar Nombre"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        width: '95%',
    },
    buttonStyle: {
        backgroundColor: '#2f95dc',
    },
});
