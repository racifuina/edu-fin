import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { auth } from '../../utils/firebase';
import { Input, Button } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import { validateEmail } from '../../utils/validations';
import { reautenticate } from '../../utils/api';
import { useThemeColor, View } from '../Themed';

export default function ChangeEmailForm(props) {
    const { email, setShowModal, setReloadUserInfo } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errors, setErrors] = useState({});
    const [errorPassword, setErrorPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setErrors({});
        if (!formData.email || email === formData.email) {
            setErrors({ email: 'El correo electrónico no ha cambiado' });
        } else if (isEmpty(formData.email) || isEmpty(formData.password)) {
            showAlert('Todos los campos son obligatorios');
        } else if (!validateEmail(formData.email)) {
            setErrors({ email: 'Correo electrónico no valido' });
        } else if (size(formData.password) < 6) {
            setErrors({ password: 'La contraseña debe tener al menos 6 caracteres' });
        } else {
            setIsLoading(true);
            reautenticate(formData.password)
                .then((response) => {
                    auth.currentUser
                        .updateEmail(formData.email)
                        .then((response) => {
                            setIsLoading(false);
                            setShowModal(false);
                            setReloadUserInfo(true);
                        })
                        .catch((err) => {
                            setIsLoading(false);
                            showAlert('Ocurrió un error al actualizar el correo electrónico');
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

    const textColor = useThemeColor({}, 'text');

    return (
        <View style={styles.view}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                autoCorrect={false}
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2',
                }}
                defaultValue={email || ''}
                onChange={(e) => onChange(e, 'email')}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
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
        email: '',
        password: '',
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

const showAlert = (message: string) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });
