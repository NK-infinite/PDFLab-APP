import { StyleSheet } from "react-native"
import { ThemeType } from '../../utils/themeManager';

export const Styles = (theme:ThemeType)=>{
  return StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  }

  })
}