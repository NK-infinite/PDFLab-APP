import { StyleSheet } from "react-native"
import { ThemeType } from "../../../utils/themeManager"

export const Styles = (Theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 18,
      backgroundColor: Theme.background,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 12,
      color: Theme.sectionTitle,
    },
    pdfPreviewContainer: {
      marginTop: 8,
      justifyContent: 'space-between',
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    metadataBox: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#f4f4f4',
      marginVertical: 10,
    },

    metaTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },

    metaItem: {
      fontSize: 13,
      marginBottom: 4,
      color: '#000000ff',
    },
    textinput: {
      paddingHorizontal: 10,
      height: 40,
      color:Theme.textPrimary || '#000',
      borderWidth: 1,
      borderRadius: 15,
      borderEndColor: '#f80000ff',
      marginBottom: 20,

    }
  })
}