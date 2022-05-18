import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions(props) {
    const { userInfo, setReloadUserInfo } = props;
    const menuOptions = generateMenuOptions();
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) => {
        switch (key) {
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case 'email':
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case 'password':
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            default:
                setRenderComponent(null);
                break;
        }
    }

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        title={menu.title}
                        leftIcon={menu.leftIcon}
                        rightIcon={menu.rightIcon}
                        containerStyle={styles.listItem}
                        onPress={() => selectedComponent(menu.key)}
                    />
                ))
            }
            {
                renderComponent && (
                    <Modal
                        isVisible={showModal}
                        setIsVisible={setShowModal}
                    >
                        {renderComponent}
                    </Modal>
                )
            }
        </View>
    )
}
function generateMenuOptions(selectComponent) {
    return [
        {
            title: "Cambiar Nombre y Apellido",
            key: "displayName",
            leftIcon: {
                type: "material-community",
                name: "account-circle",
                color: "#ccc"
            },
            rightIcon: {
                type: "material-community",
                name: "chevron-right",
                color: "#ccc"
            }
        },
        {
            title: "Cambiar correo electrónico",
            key: "email",
            leftIcon: {
                type: "material-community",
                name: "at",
                color: "#ccc"
            },
            rightIcon: {
                type: "material-community",
                name: "chevron-right",
                color: "#ccc"
            }
        },
        {
            title: "Cambiar Contraseña",
            key: "password",
            leftIcon: {
                type: "material-community",
                name: "lock-reset",
                color: "#ccc"
            },
            rightIcon: {
                type: "material-community",
                name: "chevron-right",
                color: "#ccc"
            }
        }
    ]
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})