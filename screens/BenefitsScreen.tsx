import React, { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { plainToInstance } from 'class-transformer';
import { isNil } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { Divider, ListItem } from 'react-native-elements';

import { View } from '../components/Themed';
import { auth, db } from '../utils/firebase';
import { Benefit, PointsAssignment } from '../types/lessson';
import Loading from '../components/Loading';
import { Text, useThemeColor } from '../components/Themed';
import Modal from '../components/Modal';

export default function BenefitsScreen() {
    const [benefits, setBenefits] = useState<Array<Benefit>>([]);
    const [userPoints, setUserPoints] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = () => {
        setLoading(true);

        const be = {
            title: '20% de descuento en Intelaf',
            description: 'Recibe 20% de descuento en Intelaf. Valido al comprar con tarjeta de crédito',
            points: 40,
        };
        // db.collection('benefits').add(be)

        const benefits = db
            .collection('benefits')
            .orderBy('points', 'asc')
            .get()
            .then((snap) => {
                const lessons = snap.docs.map((doc) => {
                    const lesson = doc.data();
                    lesson.id = doc.id;
                    return plainToInstance(Benefit, lesson);
                });

                return lessons;
            });

        const userId = isNil(auth.currentUser?.uid) ? 'n-a' : auth.currentUser?.uid;

        const userPoints = db
            .collection('points')
            .where('userId', '==', userId)
            .get()
            .then((snap) => {
                const userPoints = snap.docs.map((doc) => {
                    const pointAssignment = doc.data();
                    return plainToInstance(PointsAssignment, pointAssignment);
                });
                return userPoints;
            });

        Promise.all([benefits, userPoints]).then(([benefits, userPoints]) => {
            const currentUserPoints = userPoints.reduce((total: number, item) => total + item.points, 0);
            setUserPoints(currentUserPoints);
            setBenefits(benefits);
            setLoading(false);
        });
    };
    const color = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');
    const backgroundColor = useThemeColor({}, 'background');

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <Loading isVisible={true} text="Cargando los beneficios" />
            ) : (
                <View>
                    <Modal isVisible={showModal} setIsVisible={setShowModal}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 20, padding: 20 }}>
                                Presenta este código QR para obtener tu descuento
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    paddingTop: 30,
                                    paddingBottom: 30,
                                }}
                            >
                                <QRCode value="http://awesome.link.qr" size={200} />
                            </View>
                        </View>
                    </Modal>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            paddingTop: 30,
                            paddingBottom: 30,
                        }}
                    >
                        {!isNil(auth.currentUser) ? (
                            <View>
                                <Text
                                    style={{ fontSize: 45, fontWeight: 'bold', color: tintColor, textAlign: 'center' }}
                                >
                                    {userPoints}
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Puntos acumulados</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Inicia sesión para acumular puntos
                                </Text>
                            </View>
                        )}
                    </View>
                    <Divider />

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={benefits}
                        ItemSeparatorComponent={Divider}
                        renderItem={({ item }) => {
                            const iconColor =
                                !isNil(auth.currentUser) && !isNil(userPoints) && userPoints >= item.points
                                    ? 'green'
                                    : 'red';

                            // const leftIconName = !isNil(auth.currentUser) ? 'local-offer' : 'lock';
                            const leftIconName =
                                !isNil(auth.currentUser) && !isNil(userPoints) && userPoints >= item.points
                                    ? 'local-offer'
                                    : 'lock';
                            return (
                                <ListItem
                                    titleStyle={{ color, backgroundColor, fontWeight: 'bold' }}
                                    subtitleStyle={{ color, backgroundColor }}
                                    containerStyle={{ backgroundColor }}
                                    title={item.title}
                                    subtitle={item.description}
                                    rightSubtitle={`${item.points} puntos`}
                                    rightSubtitleStyle={{ color, backgroundColor }}
                                    onPress={
                                        auth.currentUser
                                            ? async () => {
                                                  if (userPoints! >= item.points) {
                                                      const pointDeduction: PointsAssignment = {
                                                          userId: auth.currentUser!.uid,
                                                          points: -1 * item.points,
                                                      };

                                                      await db.collection('points').add(pointDeduction);
                                                      setShowModal(true);
                                                      loadData();
                                                  } else {
                                                      Alert.alert(
                                                          'Debes acumular más puntos',
                                                          '',
                                                          [{ text: 'Aceptar' }],
                                                          { cancelable: false }
                                                      );
                                                  }
                                              }
                                            : undefined
                                    }
                                    leftIcon={{
                                        type: 'material-icons',
                                        name: leftIconName,
                                        size: 50,
                                        color: iconColor,
                                    }}
                                    rightIcon={
                                        auth.currentUser
                                            ? {
                                                  type: 'material-icons',
                                                  name: 'chevron-right',
                                                  color: '#ccc',
                                              }
                                            : undefined
                                    }
                                />
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}
