import { Button, StyleSheet, Alert } from 'react-native';
import { Divider } from 'react-native-elements';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Question } from '../types/lessson';
import { auth, db } from '../utils/firebase';

export default function QuizScreen({ navigation, route }: RootTabScreenProps<'QuizScreen'>) {
    const { questions, id } = route.params;

    const answer = (question: Question, option: string) => {
        const points = option === question.answer ? question.points : 0;

        const completedLesson = db.collection('completed_lessons').add({
            lessonId: id,
            userId: auth.currentUser?.uid,
            points,
            time: new Date().toISOString(),
        });

        const pointsAssigned = db.collection('points').add({
            userId: auth.currentUser?.uid,
            points,
        });

        Promise.all([completedLesson, pointsAssigned]).then(() => {
            if (points !== 0) {
                Alert.alert(
                    'Respuesta Correcta ✅',
                    `Se te han acreditado ${points} puntos`,
                    [{ text: 'Aceptar', onPress: exitScreen }],
                    {
                        cancelable: false,
                    }
                );
            } else {
                Alert.alert(
                    'Respuesta Incorrecta ❌',
                    'No se te acreditaron puntos',
                    [{ text: 'Aceptar', onPress: exitScreen }],
                    {
                        cancelable: false,
                    }
                );
            }
        });
    };

    const exitScreen = () => {
        navigation.popToTop();
    };
    return (
        <View style={styles.container}>
            {questions?.map((question) => {
                return (
                    <View style={{ padding: 8 }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                paddingVertical: 20,
                            }}
                        >
                            {question.question}
                        </Text>
                        <Divider />
                        {question.options.map((option) => {
                            return (
                                <View>
                                    <Button onPress={() => answer(question, option)} title={option} />
                                    <Divider />
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
