import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function LessonScreen({ navigation, route }: RootTabScreenProps<'LessonScreen'>) {
    const { title, image, content, isCompleted } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{
                    uri: image,
                }}
                style={{
                    height: 300,
                }}
            ></Image>
            <Text style={styles.title}>{title}</Text>
            <Text style={{ marginBottom: 20 }}>{content}</Text>
            {!isCompleted && (
                <>
                    <Divider></Divider>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('QuizScreen', route.params)}
                        style={styles.link}
                    >
                        <Text style={styles.linkText}> Tomar la evaluación</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
    link: {
        marginTop: 15,
        paddingBottom: 20,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2e78b7',
    },
});
