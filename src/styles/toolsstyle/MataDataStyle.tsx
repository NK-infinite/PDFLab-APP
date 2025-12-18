import { StyleSheet } from "react-native"
import { ThemeType } from "../../utils/themeManager"

export const Styles = (Theme:ThemeType)=>{
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 18,
            backgroundColor: Theme.background, 
          },
          sectionTitle:{
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 16,
            marginBottom: 12,
            color: Theme.sectionTitle,
          },
          pdfPreviewContainer:{
            marginTop: 8,
            justifyContent: 'space-between',
         },
         placeholder:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
         }
    })
}