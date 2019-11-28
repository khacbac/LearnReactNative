import * as React from 'react';
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
import LocationView from './wizard1/LocationView';



interface Props {

}
interface State {
    wByStep: WizardByStep;
}

const { width } = Dimensions.get('window');

export default class TestApp extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            wByStep: WizardByStep.getWizardBySteps()[0]
        }
    }

    _renderTopBar = () => {
        let { wByStep } = this.state;

        return (
            <View
                style={{
                    flexDirection: 'row',
                    // paddingVertical: 20,
                    // width: width
                }}>

                {WizardByStep.getWizardBySteps().map(current => {
                    return (
                        <View style={{
                            flex: 1,
                            // height: 100,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._getScrollView().scrollTo(current.location);
                                    this.setState({
                                        wByStep: current
                                    });
                                }}
                                style={{
                                    paddingVertical: 20,
                                }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: wByStep.step >= current.step ? 'blue' : 'black'
                                }}>{current.title}</Text>
                            </TouchableOpacity>


                            <View style={{
                                width: '100%',
                                height: 5,
                                backgroundColor: wByStep.step >= current.step ? 'blue' : 'pink'
                            }} />
                        </View>
                    )
                })}
            </View>
        )
    }

    _renderStep = () => {
        return (
            <ScrollView
                ref="scrollView"
                pagingEnabled
                horizontal
                scrollEnabled={false}
            >
                {this._getLocationStep()}
                {this._getDetailStep()}
                {this._getServiceStep()}
                {this._getAddressStep()}
                {this._getSubmitStep()}
            </ScrollView>
        )
    }

    _getLocationStep = () => {
        return <LocationView />
        // return (
        //     <ScrollView>
        //         <View style={{ width: width, padding: 20 }}>
        //             <Text style={{
        //                 fontSize: 18,
        //                 color: 'black'
        //             }}>Setup Your Current Location</Text>
        //             <View style={{
        //                 marginTop: 20
        //             }}>
        //                 {/* Address Line 1 */}
        //                 <View style={{
        //                     marginTop: 20
        //                 }}>
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>Address Line 1</Text>
        //                     <TextInput
        //                         placeholder='Address Line 1'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                     <Text style={{
        //                         fontSize: 12,
        //                         marginTop: 5
        //                     }}>Please enter your Address.</Text>
        //                 </View>

        //                 {/* Address Line 2 */}
        //                 <View style={{
        //                     marginTop: 20
        //                 }}>
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>Address Line 2</Text>
        //                     <TextInput
        //                         placeholder='Address Line 2'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                     <Text style={{
        //                         fontSize: 12,
        //                         marginTop: 5
        //                     }}>Please enter your Address.</Text>
        //                 </View>

        //                 {/* Postcode */}
        //                 <View style={{
        //                     marginTop: 20,
        //                 }}>
        //                     {/* Postcode */}
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>Postcode</Text>
        //                     <TextInput
        //                         placeholder='Postcode'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                     <Text style={{
        //                         fontSize: 12,
        //                         marginTop: 5
        //                     }}>Please enter your Postcode.</Text>
        //                 </View>

        //                 {/* City */}
        //                 <View style={{
        //                     marginTop: 20,
        //                 }}>
        //                     {/* City */}
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>City</Text>
        //                     <TextInput
        //                         placeholder='City'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                     <Text style={{
        //                         fontSize: 12,
        //                         marginTop: 5
        //                     }}>Please enter your City.</Text>
        //                 </View>

        //                 {/* State */}
        //                 <View style={{
        //                     marginTop: 20,
        //                 }}>
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>State</Text>
        //                     <TextInput
        //                         placeholder='State'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                     <Text style={{
        //                         fontSize: 12,
        //                         marginTop: 5
        //                     }}>Please enter your State.</Text>

        //                 </View>

        //                 {/*  Country*/}
        //                 <View style={{
        //                     marginTop: 20,
        //                 }}>
        //                     <Text style={{
        //                         fontSize: 14
        //                     }}>Country</Text>
        //                     <TextInput
        //                         placeholder='Country'
        //                         style={{
        //                             padding: 10,
        //                             borderRadius: 5,
        //                             borderWidth: 1,
        //                             borderColor: 'gray',
        //                             fontSize: 14,
        //                             marginTop: 10
        //                         }}
        //                     />
        //                 </View>
        //             </View>

        //             <View style={{
        //                 height: 1,
        //                 backgroundColor: 'gray',
        //                 marginVertical: 30
        //             }} />
        //             {/* bottom button */}
        //             <View style={{
        //                 alignItems: 'flex-end',
        //             }}>
        //                 <TouchableOpacity
        //                     onPress={() => {
        //                         let { wByStep } = this.state;
        //                         let next = WizardByStep.getNext(wByStep.step)
        //                         this._getScrollView().scrollTo(next.location);
        //                         this.setState({
        //                             wByStep: next
        //                         });
        //                     }}
        //                     style={{
        //                         padding: 10,
        //                         paddingHorizontal: 20,
        //                         backgroundColor: 'blue',
        //                         borderRadius: 10
        //                     }}>
        //                     <Text style={{ color: 'white' }}>NEXT STEP</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </ScrollView>

        // )
    }

    _getDetailStep = () => {
        return (
            <ScrollView>
                <View style={{ width: width, padding: 20 }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black'
                    }}>Enter the Details of your Delivery</Text>
                    <View style={{
                        marginTop: 20
                    }}>
                        {/* Package Details */}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Package Details</Text>
                            <TextInput
                                placeholder='Package Details'
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
                            }}>Please enter your Pakcage Details.</Text>
                        </View>

                        {/* Package Weight in KG */}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Package Weight in KG</Text>
                            <TextInput
                                placeholder='Package Weight in KG'
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
                            }}>Please enter your Package Weight in KG.</Text>
                        </View>

                        {/* Package Dimensions */}
                        <Text style={{
                            fontSize: 14,
                            marginTop: 20
                        }}>Package Dimensions</Text>
                        {/* Package Width in CM */}
                        <View style={{
                            marginTop: 5
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Package Width in CM</Text>
                            <TextInput
                                placeholder='Package Width in CM'
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
                            }}>Please enter your Package Width in CM.</Text>
                        </View>

                        {/* Package Height in CM */}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Package Height in CM</Text>
                            <TextInput
                                placeholder='Package Height in CM'
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
                            }}>Please enter your Package Height in CM.</Text>
                        </View>

                        {/* Package Length in CM*/}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Package Length in CM</Text>
                            <TextInput
                                placeholder='Package Length in CM'
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
                            }}>Please enter your Package Length in CM.</Text>
                        </View>

                    </View>

                    <View style={{
                        height: 1,
                        backgroundColor: 'gray',
                        marginVertical: 30
                    }} />
                    {/* bottom button */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                let { wByStep } = this.state;
                                let next = WizardByStep.getPrevious(wByStep.step)
                                this._getScrollView().scrollTo(next.location);
                                this.setState({
                                    wByStep: next
                                });
                            }}
                            style={{
                                padding: 10,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'gray'
                            }}>
                            <Text style={{ color: 'black' }}>PREVIOUS</Text>
                        </TouchableOpacity>

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

    _getServiceStep = () => {
        return (
            <ScrollView>
                <View style={{ width: width, padding: 20 }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black'
                    }}>Select your Services</Text>
                    <View style={{
                        marginTop: 20
                    }}>
                        {/* Delivery Type */}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Delivery Type</Text>
                            <TextInput
                                placeholder='Delivery Type'
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

                        {/* Packaging Type */}
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Packaging Type</Text>
                            <TextInput
                                placeholder='Packaging Type'
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

                        {/* Preferred Delivery Window */}
                        <View style={{
                            marginTop: 5
                        }}>
                            <Text style={{
                                fontSize: 14
                            }}>Preferred Delivery Window</Text>
                            <TextInput
                                placeholder='Preferred Delivery Window'
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
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                let { wByStep } = this.state;
                                let next = WizardByStep.getPrevious(wByStep.step)
                                this._getScrollView().scrollTo(next.location);
                                this.setState({
                                    wByStep: next
                                });
                            }}
                            style={{
                                padding: 10,
                                paddingHorizontal: 20,
                                // backgroundColor: 'blue',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'gray'
                            }}>
                            <Text style={{ color: 'black' }}>PREVIOUS</Text>
                        </TouchableOpacity>

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

    _getAddressStep = () => {
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
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                let { wByStep } = this.state;
                                let next = WizardByStep.getPrevious(wByStep.step)
                                this._getScrollView().scrollTo(next.location);
                                this.setState({
                                    wByStep: next
                                });
                            }}
                            style={{
                                padding: 10,
                                paddingHorizontal: 20,
                                // backgroundColor: 'blue',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'gray'
                            }}>
                            <Text style={{ color: 'black' }}>PREVIOUS</Text>
                        </TouchableOpacity>

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

    _getSubmitStep = () => {
        return (
            <ScrollView>
                <View style={{ width: width, padding: 20 }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black'
                    }}>Review your Details and Submit</Text>

                    {/* Current Address */}
                    <View style={{
                        marginTop: 20
                    }}>

                        <Text style={{
                            fontSize: 16,
                            color: 'black'
                        }}>Current Address</Text>

                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Address Line 1</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Address Line 2</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Melbourne 3000, VIC, Australia</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }} />

                    {/* Delivery Details */}
                    <View style={{
                        // marginTop: 20
                    }}>

                        <Text style={{
                            fontSize: 16,
                            color: 'black'
                        }}>Delivery Details</Text>

                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>{'Package: Complete Workstation (Monitor, Computer, Keyboard & Mouse)'}</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Weight: 25kg</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>Dimensions: 110cm (w) x 90cm (h) x 150cm (L)</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }} />

                    {/* Delivery Service Type */}
                    <View style={{
                        // marginTop: 20
                    }}>

                        <Text style={{
                            fontSize: 16,
                            color: 'black'
                        }}>Delivery Service Type</Text>

                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>{'Overnight Delivery with Regular Packaging'}</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>
                            Preferred Morning (8:00AM - 11:00AM) Delivery
                        </Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }} />

                    {/* Delivery Address */}
                    <View style={{
                        // marginTop: 20
                    }}>

                        <Text style={{
                            fontSize: 16,
                            color: 'black'
                        }}>Delivery Address</Text>

                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>{'Address Line 1'}</Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>
                            Address Line 2
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            marginTop: 5
                        }}>
                            Preston 3072, VIC, Australia
                        </Text>
                    </View>

                    <View style={{
                        height: 1,
                        backgroundColor: 'gray',
                        marginVertical: 30
                    }} />
                    {/* bottom button */}
                    <View style={{
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                // let { wByStep } = this.state;
                                // let next = WizardByStep.getNext(wByStep.step)
                                // this._getScrollView().scrollTo(next.location);
                                // this.setState({
                                //     wByStep: next
                                // });
                            }}
                            style={{
                                padding: 10,
                                paddingHorizontal: 20,
                                backgroundColor: 'green',
                                borderRadius: 10
                            }}>
                            <Text style={{ color: 'white' }}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    _getTopScrollView = (): ScrollView => {
        return this.refs.topScrollView as ScrollView;
    }

    _getScrollView = (): ScrollView => {
        return this.refs.scrollView as ScrollView;
    }

    render() {

        return (
            <View style={styles.container}>
                {this._renderTopBar()}

                <View style={{
                    flex: 1
                }}>
                    {this._renderStep()}
                </View>
            </View>
        );
    }
}

enum WizardStep {
    LOCATION = 0,
    DETAIL = 1,
    SERVICE = 2,
    ADDRESS = 3,
    SUBMIT = 4
}

export class WizardByStep {
    step: WizardStep;
    location: { x: number }
    index: number;
    title: string;

    constructor(step: WizardStep, location: { x: number }, index: number, title: string) {
        this.step = step;
        this.location = location;
        this.index = index;
        this.title = title;
    }
    static getWizardBySteps(): Array<WizardByStep> {
        return [
            new WizardByStep(WizardStep.LOCATION, { x: 0 }, 0, '1. Setup Location'),
            new WizardByStep(WizardStep.DETAIL, { x: width }, 1, '2. Enter Details'),
            new WizardByStep(WizardStep.SERVICE, { x: 2 * width }, 2, '3. Select Services'),
            new WizardByStep(WizardStep.ADDRESS, { x: 3 * width }, 3, '4. Delivery Address'),
            new WizardByStep(WizardStep.SUBMIT, { x: 4 * width }, 4, '5. Review and Submit'),
        ]
    }

    static getNext(step: WizardStep): WizardByStep {
        return this.getWizardBySteps()[step + 1];
    }

    static getPrevious(step: WizardStep): WizardByStep {
        return this.getWizardBySteps()[step - 1];
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});