import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import HeaderV2 from '../../../module/ui/HeaderV2';
import colors from '../../../res/colors';
import HttpUtils, { Status } from '../../../module/http/HttpUtils';
import images from '../../../res/drawable/images';
import strings from '../../../res/strings';
import dimens from '../../../res/dimens';
import ScreenName from '../../ScreenName';

const productImages = [
    images.apple,
    images.banana,
    images.cherries,
    images.cranberry,
    images.orange,
    images.pineapple,
];

const prices = [0.99, 0.9, 1.5, 1.22, 0.91, 2.2, 1.24];

const { width, height } = Dimensions.get('window');

export default class ProductScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            // status fecth data.
            httpStatus: Status.LOADING
        }
    }

    async componentDidMount() {
        // get param from previous screen.
        let category = this.props.navigation.getParam("CATEGORY");
        try {
            // get all product from server.
            let prs = await HttpUtils.requestGet(category.category_url);
            if (prs && prs.products) {
                prs.products.forEach(item => {
                    item.product_photo = productImages[Math.floor(Math.random() * productImages.length)];
                    item.price = prices[Math.floor(Math.random() * prices.length)];
                    item.description = "This is description of " + item.name;
                });
                this.setState({
                    products: prs.products,
                    httpStatus: Status.SUCCESS
                });
            } else {
                this.onFetchError();
            }
        } catch (error) {
            this.onFetchError();
        }
    }

    // Có lỗi xảy ra.
    onFetchError() {
        this.setState({
            products: [],
            httpStatus: Status.ERROR
        });
        Alert.alert("", strings.http_error);
    }

    /**
     * render header.
     */
    _renderHeader = () => {
        return <HeaderV2
            leftIcon="chevron-left"
            onLeftIconPress={() => this.props.navigation.goBack()}
            rightIcon="shopping-basket"
            title={"Products".toUpperCase()}
            txtColor={colors.colorWhite}
            rootStyle={{
                backgroundColor: colors.colorGreen40
            }} />
    }

    /**
     * render main view.
     */
    _renderContentView = () => {
        return <View style={{
            flex: 1
        }}>
            <FlatList
                data={this.state.products}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.name + index}
            />
            {this.state.httpStatus == Status.LOADING && <ActivityIndicator
                size="large"
                color={colors.colorGreen40}
                style={styles.indicator} />}
        </View>
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.gotoProductDetail(item)}
                style={styles.item_list_container}>
                <Image
                    style={styles.product_photo}
                    source={item.product_photo}
                    resizeMode="contain"
                />
                <View style={{
                    flex: 1,
                    padding: dimens._10
                }}>
                    {/* product name */}
                    <Text style={styles.product_name}>{item.name.toUpperCase()}</Text>
                    {/* product description */}
                    <View style={{
                        flex: 1
                    }}>
                        <Text
                            numberOfLines={2}
                            style={styles.product_des}>{item.description}</Text>
                    </View>
                    {/* product_price */}
                    <Text style={styles.product_price}>
                        {`$${item.price}`}
                        <Text style={{ color: colors.colorBlackMedium, }}>{" / kg"}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    gotoProductDetail(item) {
        this.props.navigation.navigate(ScreenName.Product_Detail, { PRODUCT: item })
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: colors.colorGrayMain
            }}>
                {this._renderHeader()}
                {this._renderContentView()}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicator: {
        position: 'absolute',
        ...StyleSheet.absoluteFillObject
    },
    item_list_container: {
        backgroundColor: colors.colorWhite,
        padding: dimens._20,
        marginHorizontal: dimens._10,
        marginTop: dimens._10,
        flexDirection: 'row',
        elevation: dimens._2
    },
    product_photo: {
        height: width / 3,
        width: width / 3,
    },
    product_name: {
        color: colors.colorBlack,
        fontSize: 18,
        fontWeight: 'bold'
    },
    product_des: {
        color: colors.colorGray,
        fontSize: 14
    },
    product_price: {
        color: colors.colorRed,
        fontSize: 14
    }
});