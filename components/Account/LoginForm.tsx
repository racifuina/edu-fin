import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import { auth } from '../../utils/firebase';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const showAlert = (message: string) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });

    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            showAlert('Todos los campos son obligatorios');
        } else if (!validateEmail(formData.email)) {
            showAlert('Correo electrónico no valido');
        } else if (size(formData.password) < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres');
        } else {
            setLoading(true);
            auth.signInWithEmailAndPassword(formData.email, formData.password)
                .then((response) => {
                    setLoading(false);
                    navigation.navigate('account');
                })
                .catch((err) => {
                    setLoading(false);
                    showAlert('El email o la contraseña están incorrectas');
                });
        }
    };

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                autoCorrect={false}
                style={styles.formInput}
                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
                onChange={(e) => onChange(e, 'email')}
            />
            <Input
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                style={styles.formInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword((show) => !show)}
                    />
                }
                onChange={(e) => onChange(e, 'password')}
            />
            <Button
                title="Iniciar sesión"
                containerStyle={styles.registerButtonContainer}
                buttonStyle={styles.registerButtonStyle}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Iniciando sesión" />
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
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    formInput: {
        width: '100%',
        marginTop: 20,
    },
    registerButtonContainer: {
        marginTop: 20,
        width: '95%',
    },
    registerButtonStyle: {
        backgroundColor: '#2f95dc',
    },
    iconRight: {
        color: '#c1c1c1',
    },
});
