import {Platform} from "react-native";

const withPlatform = (androidOpt, iosOpt) => {
    return Platform.OS === "android" ? androidOpt : iosOpt
}

export default withPlatform