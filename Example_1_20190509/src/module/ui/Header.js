import { View, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../res/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <Text style={{
                    marginHorizontal: 10
                }}>
                    {this.props.leftIcon && <FontAwesome5 name={this.props.leftIcon} size={18} />}
                </Text>
                <Text style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 18
                }}>{this.props.title || ""}</Text>
                {this.props.rightIcon && <Text style={{
                    marginHorizontal: 10
                }}>
                    <FontAwesome5 name={this.props.rightIcon} size={18} />
                </Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        width: "100%",
        backgroundColor: colors.colorGrayMain,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})