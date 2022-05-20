import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';

export default function UserGuest() {
    const navigation = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            {/* <Image
                source={require('../../assets/img/user-guest.jpg')}
                resizeMode="contain"
                style={styles.image}
            /> */}
            <Text style={styles.title}>Consulta tu perfil de Edu-Fin</Text>
            <Text style={{...styles.description, fontSize: 16}}>¿Que tan buena está tu educación financiera?</Text>
            <Text style={styles.description}>Accede al mejor lugar para mejorar tu educación financiera.</Text>
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    );
}

let styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: 300,
        width: '100%',
        marginBottom: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    viewBtn: {
        flex: 1,
        alignItems: 'center',
    },
    btnStyle: {
        backgroundColor: '#2f95dc',
    },
    btnContainer: {
        width: '70%',
    },
});
