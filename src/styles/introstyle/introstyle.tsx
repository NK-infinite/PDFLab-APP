import { StyleSheet } from "react-native";
import { isDark } from "../../utils/themeManager";

export  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDark ? '#000' :  '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDark ? '#fff' : '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color:isDark ? '#c4bcbcff' : '#555',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
