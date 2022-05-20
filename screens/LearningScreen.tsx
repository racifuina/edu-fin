import React, { useCallback, useState } from 'react';
import { plainToInstance } from 'class-transformer';
import Timeline from 'react-native-timeline-flatlist';
import { isNil } from 'lodash';
import { auth, db } from '../utils/firebase';
import { useFocusEffect } from '@react-navigation/native';

import { RootTabScreenProps } from '../types';
import { CompletedLesson, Lesson } from '../types/lessson';
import Loading from '../components/Loading';
import { View } from '../components/Themed';

export default function LearningScreen({ navigation }: RootTabScreenProps<'LearningScreen'>) {
    const [lessons, setLessons] = useState<Array<Lesson>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useFocusEffect(
        useCallback(() => {
            loadLessons();
        }, [])
    );

    const loadLessons = () => {
        setLoading(true);

        const lessons = db
            .collection('lessons')
            .orderBy('points', 'asc')
            .get()
            .then((snap) => {
                const lessons = snap.docs.map((doc) => {
                    const lesson = doc.data();
                    lesson.id = doc.id;
                    return plainToInstance(Lesson, lesson);
                });

                return lessons;
            });

        const userId = isNil(auth.currentUser?.uid) ? 'n-a' : auth.currentUser?.uid;

        const completedLessons = db
            .collection('completed_lessons')
            .where('userId', '==', userId)
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
                if (!isNil(auth.currentUser)) {
                    lesson.isCompleted = !isNil(completedLesson);
                    lesson.title = `${lesson.isCompleted ? '✅' : '⭕️'} ${lesson.title}`;
                    lesson.description = lesson.isCompleted
                        ? lesson.description
                        : `${lesson.description}\n\n${lesson.points} Puntos`;
                }

                return lesson;
            });
            setLoading(false);
            setLessons(filledLessons);
        });
    };

    const onEventPress = (e: Lesson) => {
        navigation.navigate('LessonScreen', e);
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <Loading isVisible={true} text="Cargando las lecciones" />
            ) : (
                <Timeline
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
