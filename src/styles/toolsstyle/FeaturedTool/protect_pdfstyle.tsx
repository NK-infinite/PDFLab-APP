import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";

export const Styles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,

      backgroundColor: theme.background,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 20,
      marginBottom: 20,
    },
    content: {
      flex: 1,
      marginTop: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginLeft: 16,
      color: theme.sectionTitle,
    },
    cardContainer: {
      marginTop: 8,
    },
    
    inputWrapper: {
      flex: 1,
    },
    textInput: {
      flex: 1,
      padding: 14,
      fontSize: 16,
      justifyContent: 'space-between',
      color: '#000000ff',
    },
    input: {
      marginVertical: 10,
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: '#ccc',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyeicon: {
      right: 15
    }
  });
}