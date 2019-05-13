import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../res/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderV2 extends React.Component {
    render() {
        return (
            <View style={[styles.root, this.props.rootStyle]}>
                {this.props.leftIcon && <TouchableOpacity onPress={this.props.onLeftIconPress}>
                    <Text style={{
                        marginHorizontal: 10,
                        color: this.props.txtColor || colors.colorBlackMedium
                    }}>
                        <FontAwesome5 name={this.props.leftIcon} size={18} />
                    </Text>
                </TouchableOpacity>}

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: this.props.txtColor || colors.colorBlackMedium
                    }}>{this.props.title || ""}</Text>
                </View>

                {this.props.rightIcon && <Text style={{
                    marginHorizontal: 10
                }}>
                    <FontAwesome5 name={this.props.rightIcon} size={18} color={this.props.txtColor || colors.colorBlackMedium} />
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
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})