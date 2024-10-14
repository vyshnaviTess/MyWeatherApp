import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
  card: {
    marginVertical: 10,
    padding: 15,
  },
  date: {
    fontSize: 18,
    color: '#6200ee',
  },
  temp: {
    fontSize: 16,
    marginVertical: 5,
  },
  desc: {
    fontSize: 14,
    color: '#333',
  },
  humidity: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
