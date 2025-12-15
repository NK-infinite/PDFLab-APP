import { Text, TouchableOpacity, useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { StyleSheet } from "react-native";


interface DrawerItemProps {
    iconName: string;
    label: string;
    onPress: () => void;
}

export const DrawerItem = ({ iconName, label, onPress }: DrawerItemProps) => {

    const isDarkMode = useColorScheme() === 'dark';


    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Icon name={iconName} size={24} color="#6A5ACD" />
            <Text style={[styles.itemLabel, { color: isDarkMode ? '#fff' : '#000' }]}>{label}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    itemLabel: {
        marginLeft: 10,
        fontSize: 16,
    }

});