import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  placeView: {
    height: "35%",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "center",
  },
  title: {
    color: '#6200ee',
    marginTop: 30,
    fontSize: 30,
  },
  image: {
    width: 120,
    height: 120,
  },
  card: {
    margin: 5,
    padding: 12,
  },
  tempInfo: {
    paddingTop: 10,
    height: "15%",
    width: "20%",
    color: "rgb(4, 92, 136)",
    fontSize: 35,
  },
  infoTitle: {
    color: "rgb(4, 92, 136)",
  },
  desc: {
    color: "#6200ee",
  },
  button: {
    margin: 20,
    padding: 10,
    backgroundColor: '#00aaff',
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default styles;
