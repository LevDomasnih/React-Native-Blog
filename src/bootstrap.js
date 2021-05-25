import * as Font from "expo-font"
import DB from "./db";

const bootstrap = async () => {
    try {
        await Font.loadAsync({
            "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
            "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf")
        })
        await DB.init()
        console.log("Success start")
    } catch (e) {
        console.log("Error: ", e)
    }

}

export default bootstrap