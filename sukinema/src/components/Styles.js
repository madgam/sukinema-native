import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    textAlign: 'center',
    color: '#555555',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic' +
      '"ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, ' +
      'sans-serif',
    lineHeight: 2,
    fontSize: 1.6,
    letterSpacing: 0.03,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cards: {
    borderRadius: 10,
    position: 'relative',
    marginBottom: 20,
  },
  card: {
    height: 200,
    width: 320,
    position: 'relative',
  },
  content: {
    padding: 6,
    // fontSize: 50,
    // alignItems: 'center',
  },
  left_text: {
    width: '25%',
    // fontSize: 120,
    lineHeight: 1.2,
    textAlign: 'center',
  },
});

export default Styles;
