import React, { useState } from "react"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';
import { WizardByStep } from "../TestApp";

const { width } = Dimensions.get('window');
const LocationView = () => {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    return (
        <ScrollView>
            <View style={{ width: width, padding: 20 }}>
                <Text style={{
                    fontSize: 18,
                    color: 'black'
                }}>Setup Your Current Location</Text>
                <View style={{
                    marginTop: 20
                }}>
                    {/* Address Line 1 */}
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontSize: 14
                        }}>Address Line 1</Text>
                        <TextInput
                            placeholder='Address Line 1'
                            // value={address1}
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                            onChangeText={address1 => setAddress1(address1)}
                        />
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Please enter your Address.</Text>
                    </View>

                    {/* Address Line 2 */}
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontSize: 14
                        }}>Address Line 2</Text>
                        <TextInput
                            placeholder='Address Line 2'
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                            onChangeText={address2 => setAddress1(address2)}
                        />
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Please enter your Address.</Text>
                    </View>

                    {/* Postcode */}
                    <View style={{
                        marginTop: 20,
                    }}>
                        {/* Postcode */}
                        <Text style={{
                            fontSize: 14
                        }}>Postcode</Text>
                        <TextInput
                            placeholder='Postcode'
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                        />
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Please enter your Postcode.</Text>
                    </View>

                    {/* City */}
                    <View style={{
                        marginTop: 20,
                    }}>
                        {/* City */}
                        <Text style={{
                            fontSize: 14
                        }}>City</Text>
                        <TextInput
                            placeholder='City'
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                        />
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Please enter your City.</Text>
                    </View>

                    {/* State */}
                    <View style={{
                        marginTop: 20,
                    }}>
                        <Text style={{
                            fontSize: 14
                        }}>State</Text>
                        <TextInput
                            placeholder='State'
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                        />
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Please enter your State.</Text>

                    </View>

                    {/*  Country*/}
                    <View style={{
                        marginTop: 20,
                    }}>
                        <Text style={{
                            fontSize: 14
                        }}>Country</Text>
                        <TextInput
                            placeholder='Country'
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                fontSize: 14,
                                marginTop: 10
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    height: 1,
                    backgroundColor: 'gray',
                    marginVertical: 30
                }} />
                {/* bottom button */}
                <View style={{
                    alignItems: 'flex-end',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            let { wByStep } = this.state;
                            let next = WizardByStep.getNext(wByStep.step)
                            this._getScrollView().scrollTo(next.location);
                            this.setState({
                                wByStep: next
                            });
                        }}
                        style={{
                            padding: 10,
                            paddingHorizontal: 20,
                            backgroundColor: 'blue',
                            borderRadius: 10
                        }}>
                        <Text style={{ color: 'white' }}>NEXT STEP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default LocationView;