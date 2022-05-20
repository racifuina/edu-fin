import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { plainToInstance } from 'class-transformer';
import Timeline from 'react-native-timeline-flatlist';
import { isNil } from 'lodash';
import { auth, db } from '../utils/firebase';
import { useFocusEffect } from '@react-navigation/native';

import { RootTabScreenProps } from '../types';
import { CompletedLesson, Lesson } from '../types/lessson';
import Loading from '../components/Loading';
import { useThemeColor } from '../components/Themed';

import { View } from '../components/Themed';

export default function BenefitsScreen() {
    return (
        <View style={styles.container}>
            <FlatList data={[]} renderItem={() => <View></View>} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
