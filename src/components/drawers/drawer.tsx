import { Text, View, TouchableOpacity, useColorScheme,  } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { StyleSheet } from "react-native";
import { useTheme } from "../../utils/themeManager";
import Animated, { FadeInLeft } from "react-native-reanimated";

interface DrawerItemProps {
    iconName: string;
    label: string;
    onPress: () => void;
}

export const DrawerItem = ({ iconName, label, onPress }: DrawerItemProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.drawerCard, borderColor: theme.drawerCardBorder, marginBottom: 16 }]} onPress={onPress}>
            <Animated.View entering={FadeInLeft.springify().damping(30).mass(1).stiffness(10).duration(1000)}>
            <Icon name={iconName} size={24} color={isDarkMode ? '#00ffeaff' : '#000'} />
            </Animated.View>
            <Text style={[styles.itemLabel, { color: theme.textPrimary }]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5,
        borderRadius: 10,
        borderWidth: 2,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },
    itemLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
});