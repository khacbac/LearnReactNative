import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    Alert,
    ImageBackground
} from "react-native";
import HeaderV2 from "../../module/ui/HeaderV2";
import colors from "../../res/colors";
import HttpUtils, { Status } from "../../module/http/HttpUtils";
import MethodName from "../../module/http/MethodName";
import ScreenName from "../ScreenName";
import dimens from "../../res/dimens";
import images from "../../res/drawable/images";

const { width, height } = Dimensions.get('window');
const colorBgs = ['#ff9900', '#ff3333', '#e65c00', '#e6e600', "#cc0066"];
const categoryImages = [
    // images.fruit_background,
    images.fruit_background_1,
    images.fruit_background_2,
    images.fruit_background_3,
];

export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            httpStatus: Status.LOADING
        }
    }

    async componentDidMount() {
        let categoryList = []
        try {
            let cs = await HttpUtils.requestGet(MethodName.GET_CATEGORIES);
            if (cs && cs.categories) {
                cs.categories.forEach(item => {
                    categoryList.push(item);
                });
                this.setState({ categoryList, httpStatus: Status.SUCCESS })
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
            categoryList: [],
            httpStatus: Status.ERROR
        });
        Alert.alert("", strings.http_error);
    }

    /**
     * render header.
     */
    _renderHeader = () => {
        return <HeaderV2
            leftIcon="bars"
            rightIcon="search"
            title={"Categories".toUpperCase()}
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
                data={this.state.categoryList}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.name.toString()}
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
                onPress={() => this.gotoProduct(item)}
                style={[styles.item_list_container,]}>
                <ImageBackground
                    style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}
                    source={categoryImages[Math.floor(Math.random() * categoryImages.length)]}>
                    <Text style={styles.item_list_txt}>{item.name.toUpperCase()}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    gotoProduct(item) {
        this.props.navigation.navigate(ScreenName.Product, { "CATEGORY": item });
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1
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
    item_seprate: {
        height: 1,
        backgroundColor: colors.colorWhite
    },
    indicator: {
        position: 'absolute',
        ...StyleSheet.absoluteFillObject
    },
    item_list_container: {
        height: height / 5,

        justifyContent: 'center',
        // paddingHorizontal: dimens._20
    },
    item_list_txt: {
        color: colors.colorGreen40,
        fontSize: 20
    }
});