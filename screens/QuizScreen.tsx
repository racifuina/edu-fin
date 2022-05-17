import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function QuizScreen({ navigation, route }: RootTabScreenProps<'QuizScreen'>) {
    const { title, description } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Evaluación</Text>
            <Text style={styles.title}>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
