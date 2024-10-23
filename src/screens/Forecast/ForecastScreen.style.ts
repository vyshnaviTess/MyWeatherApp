import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  weatherByCity: {
    marginTop: 10,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6200ee',
  },
  temp: {
    fontSize: 14,
    marginBottom: 3,
  },
  desc: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
  humidity: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
});

export default styles;
