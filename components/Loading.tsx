import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useThemeColor } from './Themed';

export default function Loading(props: { isVisible: boolean; text: string }) {
    const { isVisible, text } = props;
    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');
    const overlayColor = useThemeColor({}, 'overlay');
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor={overlayColor}
            overlayBackgroundColor="transparent"
            overlayStyle={{
                height: 100,
                width: 200,
                backgroundColor: backgroundColor,
                borderColor: textColor,
                borderWidth: 2,
                borderRadius: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" color={textColor} />
                {text && (
                    <Text
                        style={{
                            color: textColor,
                            textTransform: 'uppercase',
                            marginTop: 10,
                            textAlign: 'center',
                        }}
                    >
                        {text}
                    </Text>
                )}
            </View>
        </Overlay>
    );
}
