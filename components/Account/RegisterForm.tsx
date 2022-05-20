import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import { auth } from '../../utils/firebase';
import { useThemeColor } from '../Themed';

export default function RegisterForm(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const showAlert = (message) => Alert.alert('Error', message, [{ text: 'Aceptar' }], { cancelable: false });

    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            showAlert('Todos los campos son obligatorios');
        } else if (!validateEmail(formData.email)) {
            showAlert('Correo electrónico no valido');
        } else if (formData.password !== formData.repeatPassword) {
            showAlert('Las contraseñas deben ser iguales');
        } else if (size(formData.password) < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres');
        } else {
            setLoading(true);
            auth.createUserWithEmailAndPassword(formData.email, formData.password)
                .then((response) => {
                    setLoading(false);
                    navigation.navigate('account');
                })
                .catch((err) => {
                    setLoading(false);
                    showAlert('El email ya está en uso.');
                });
        }
    };
    const textColor = useThemeColor({}, 'text');

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
                autoCorrect={false}
                style={styles.formInput}
                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
                onChange={(e) => onChange(e, 'email')}
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={!showPassword}
                style={styles.formInput}
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
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
            <Input
                placeholder="Repetir contraseña"
                placeholderTextColor="gray"
                inputStyle={{ color: textColor }}
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
                onChange={(e) => onChange(e, 'repeatPassword')}
            />
            <Button
                title="Unirse"
                containerStyle={styles.registerButtonContainer}
                buttonStyle={styles.registerButtonStyle}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando Cuenta" />
        </View>
    );
}

function defaultFormValues() {
    return {
        email: '',
        password: '',
        repeatPassword: '',
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
