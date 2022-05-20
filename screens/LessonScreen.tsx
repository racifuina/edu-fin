import { isNil } from 'lodash';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import { Text, useThemeColor, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { auth } from '../utils/firebase';

export default function LessonScreen({ navigation, route }: RootTabScreenProps<'LessonScreen'>) {
    const { title, image, content, isCompleted } = route.params;
    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');

    const htmlStyles = StyleSheet.create({
        p: {
            color: textColor,
            backgroundColor: backgroundColor,
        },
        h1: {
            color: textColor,
            fontSize: 30,
            fontWeight: 'bold',
        },
        h2: {
            color: textColor,
            fontSize: 30,
            fontWeight: 'bold',
        },
    });

    return (
        <ScrollView style={{ backgroundColor, flex: 1, padding: 8 }}>
            <Image
                source={{
                    uri: image,
                }}
                style={{
                    height: 300,
                }}
            ></Image>
            <Text style={styles.title}>{title}</Text>
            <View style={{ marginBottom: 20 }}>
                <HTMLView value={content!} stylesheet={htmlStyles} />
            </View>

            {!isCompleted && !isNil(auth.currentUser) && (
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
