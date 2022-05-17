import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { plainToInstance } from 'class-transformer';
import Timeline from 'react-native-timeline-flatlist';
import { isNil } from 'lodash';
import { db } from '../utils/firebase';
import { useFocusEffect } from '@react-navigation/native';

import { RootTabScreenProps } from '../types';
import { CompletedLesson, Lesson } from '../types/lessson';
import Loading from '../components/Loading';
import { useThemeColor } from '../components/Themed';

export default function LearningScreen({ navigation }: RootTabScreenProps<'LearningScreen'>) {
    const [lessons, setLessons] = useState<Array<Lesson>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const backgroundColor = useThemeColor({}, 'background');

    useFocusEffect(
        useCallback(() => {
            loadLessons();
        }, [])
    );

    const loadLessons = () => {
        setLoading(true);

        const lessons = db
            .collection('lessons')
            .get()
            .then((snap) => {
                const lessons = snap.docs.map((doc) => {
                    const lesson = doc.data();
                    lesson.id = doc.id;
                    return plainToInstance(Lesson, lesson);
                });

                return lessons;
            });

        const completedLessons = db
            .collection('completed_lessons')
            .where('userId', '==', 'usuario')
            .get()
            .then((snap) => {
                const completedLessons = snap.docs.map((doc) => {
                    const completedLesson = doc.data();
                    return plainToInstance(CompletedLesson, completedLesson);
                });

                return completedLessons;
            });

        Promise.all([lessons, completedLessons]).then(([lessons, completedLessons]) => {
            const filledLessons = lessons.map((lesson) => {
                const completedLesson = completedLessons.find((cl) => cl.lessonId === lesson.id);
                lesson.isCompleted = !isNil(completedLesson);
                return lesson;
            });
            console.log('filledLessons', filledLessons)
            setLoading(false);
            setLessons(filledLessons);
        });
    };

    const onEventPress = (e: Lesson) => {
        navigation.navigate('LessonScreen', e);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Loading isVisible={true} text="Cargando las lecciones" />
            ) : (
                <Timeline
                    style={{
                        flex: 1,
                        backgroundColor: backgroundColor,
                    }}
                    data={lessons}
                    circleColor="rgba(0,0,0,0)"
                    lineColor="rgb(45,156,219)"
                    onEventPress={onEventPress}
                    descriptionStyle={{ color: 'gray' }}
                    separator={false}
                    detailContainerStyle={{
                        marginTop: 8,
                        marginBottom: 8,
                        paddingHorizontal: 8,
                        backgroundColor: '#BBDAFF',
                        borderRadius: 10,
                        marginHorizontal: 5,
                    }}
                    columnFormat="two-column"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
