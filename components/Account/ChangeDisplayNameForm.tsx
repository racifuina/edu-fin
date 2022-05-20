import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../../utils/firebase';
import { useThemeColor, View } from '../Themed';

const showAlert = (message: string) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });

export default function ChangeDisplayNameForm(props: {
    displayName: string;
    setShowModal: any;
    setReloadUserInfo: any;
}) {
    const { displayName, setShowModal, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
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
                .then(() => {
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
    
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={styles.view}>
            <Input
                placeholder="Nombre y Apellido"
                containerStyle={styles.input}
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
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
