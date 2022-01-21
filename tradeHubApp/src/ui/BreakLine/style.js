import COLORS from "../../constants/Colors";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 40,

    },
    line: {
        width: '30%',
        height: 1,
        backgroundColor: COLORS.informText
    },
    text: {
        marginHorizontal: '10%',
        textTransform: 'uppercase',
        fontSize: 16,
        color: COLORS.informText,
        fontWeight: 'bold',
    }
});

export default styles;