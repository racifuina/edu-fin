import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function LessonScreen({ navigation, route }: RootTabScreenProps<'LessonScreen'>) {
    const { title, description } = route.params;
    // navigation.setOptions({
    //     title,
    // });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>{description}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('QuizScreen', route.params)} style={styles.link}>
                <Text style={styles.linkText}>Go take quiz!</Text>
            </TouchableOpacity>
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
