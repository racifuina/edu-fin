import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"
import LoginForm from '../../components/Account/LoginForm'

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require('../../assets/img/5-tenedores-letras-icono-logo.png')}
                resizeMode="contain"
                style={styles.logo} />
            <View style={styles.viewContainer}>
                <LoginForm />
                <CreateAccount />
                </View>
            <Divider style={styles.divider} />
        </ScrollView>
    )
}

function CreateAccount(props) {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: "#2f95dc",
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#2f95dc",
        margin: 40
    }
})