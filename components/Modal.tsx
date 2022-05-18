import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Modal(props: { isVisible: any; setIsVisible: any; children: any }) {
    const { isVisible, setIsVisible, children } = props;

    const closeModal = () => setIsVisible(false);
    return (
        <Overlay
            isVisible={isVisible}
            // windowsBackgroundColor={'rgba(0, 0, 0, 0.5)'}
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '90%',
        backgroundColor: '#FFF',
    },
});