import { StyleSheet, View } from 'react-native';
import Timeline, { Data } from 'react-native-timeline-flatlist';

import { RootTabScreenProps } from '../types';
import { Lesson } from '../types/lessson';

export default function LearningScreen({ navigation }: RootTabScreenProps<'LearningScreen'>) {
    const onEventPress = (e: Lesson) => {
        navigation.navigate('LessonScreen', e)
    };

    const data: Lesson[] = [
        {
            title: '🚀 Inicio',
            description: 'The Beginne does not require you to bring any equipment.',
        },
        {
            title: 'Play Badminton',
            description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        },
        {
            title: 'Watch Soccer',
            description: 'Team sport played between two teams of eleven players with a spherical ball. ',
        },
        {
            title: '🏁 Meta',
            description: 'Look out for the Best Gym & Fitness Centers around me :)',
        },
    ];

    return (
        <View style={styles.container}>
            <Timeline
                style={styles.list}
                data={data}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
    },
});
