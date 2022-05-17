import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LearningScreen from '../screens/LearningScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
const Stack = createStackNavigator();

export default function LearningStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LearningScreen" component={LearningScreen} options={{ title: 'Aprendizaje' }} />
            <Stack.Screen
                name="LessonScreen"
                component={LessonScreen}
                options={{
                    title: 'Lección',
                }}
            />
            <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Evaluación' }} />
        </Stack.Navigator>
    );
}
