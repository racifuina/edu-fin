import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { auth } from '../../utils/firebase';
import { Input, Button } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import { reautenticate } from '../../utils/api';

export default function ChangePasswordForm(props) {
    const { setShowModal, setReloadUserInfo } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setErrors({});
        if (isEmpty(formData.password) || isEmpty(formData.newPassword) || isEmpty(formData.confirmPassword)) {
            showAlert('Todos los campos son obligatorios');
        } else if (formData.newPassword !== formData.confirmPassword) {
            showAlert('Las nuevas contraseñas deben ser iguales');
        } else if (size(formData.newPassword) < 6) {
            setErrors({ newPassword: 'La contraseña debe tener al menos 6 caracteres' });
        } else {
            setIsLoading(true);
            reautenticate(formData.password)
                .then((response) => {
                    auth.currentUser
                        .updatePassword(formData.newPassword)
                        .then((response) => {
                            setIsLoading(false);
                            setShowModal(false);
                            auth.signOut();
                        })
                        .catch((err) => {
                            setIsLoading(false);
                            showAlert('Ocurrió un error al actualizar la contraseña');
                        });
                })
                .catch((err) => {
                    setIsLoading(false);
                    showAlert('La contraseña es incorrecta.');
                });
        }
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <View style={styles.view}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword((show) => !show),
                }}
                onChange={(e) => onChange(e, 'password')}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword((show) => !show),
                }}
                onChange={(e) => onChange(e, 'newPassword')}
                errorMessage={errors.newPassword}
            />
            <Input
                placeholder="Confirmar nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword((show) => !show),
                }}
                onChange={(e) => onChange(e, 'confirmPassword')}
                errorMessage={errors.confirmPassword}
            />
            <Button
                title="Actualizar"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultFormValues() {
    return {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };
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

const showAlert = (message) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });
