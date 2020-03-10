import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('screen');

const color = {
  blue: '#4A90E2',
  darkgray: '#282828',
  black: 'black',
  gray: '#E4EBF1',
  truegray: 'gray',
  nearwhite: '#FAFBFD',
  white: 'white',
  green: '#B8E986',
  yellow: '#FBB040',
  red: '#D0021B',
  random: () => {
    const roll = Math.random();

    switch (true) {
      case roll > 0.66:
        return color.yellow;
      case roll > 0.33:
        return color.red;
      default:
        return color.green
    }
  }
};

module.exports.color = color;

module.exports.s = StyleSheet.create({
  topPadding: (StatusBar.currentHeight || 20 * height / 667) + 10,
  height,
  width,
  br: px => ({
    marginTop: px * height / 667
  }),
  scrollview: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  background: {
    paddingTop: (StatusBar.currentHeight || 20 * height / 667) + 10,
    paddingLeft: 18 * height / 667,
    paddingRight: 18 * height / 667,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'green',
    width: '100%'
  },

  background_no_align: {
    paddingTop: (StatusBar.currentHeight || 20 * height / 667) + 10,
    paddingLeft: 18 * height / 667,
    paddingRight: 18 * height / 667,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    marginBottom: 10 * height / 667
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexinputbox: {
    flex: 1,
    width: '100%',
    marginTop: 8 * height / 667
  },
  leftrow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  rightrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  image: (w, h) => ({
    width: w * height / 667,
    height: h * height / 667,
    resizeMode: 'center'
  }),
  text: (fontSize, lineHeight, fontWeight, textAlign, c) => ({
    fontSize: fontSize * height / 667,
    lineHeight: lineHeight * height / 667,
    fontWeight,
    textAlign,
    color: c
  }),
  middle: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'white',
    paddingBottom: 26 * height / 667
  },
  middle_no_align: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingBottom: 26 * height / 667
  },
  imagesContainer: {
    marginTop: 10 * height / 667,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  roleContainer: {
    width: 80 * height / 667,
    height: 80 * height / 667,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'green',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  setStartedRoleContainer: {
    paddingTop: 13 * height / 667,
    paddingBottom: 11 * height / 667,
    marginRight: 10 * height / 667,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4EBF1'
  },

  textbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  justbox: {
    width: '100%',
    marginTop: 20 * height / 667,
    marginRight: 10 * height / 667
  },

  inputbox: {
    width: '100%',
    marginTop: 20 * height / 667,
    borderBottomWidth: 1,
    borderColor: '#EAE7DF',
    marginRight: 10 * height / 667
  },

  input: {
    // height: 22 * height / 667
  },

  buttonbox: (backgroundColor, borderColor) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10 * height / 667,
    height: 54 * height / 667,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor,
    borderColor
  }),

  smallbuttonbox: (backgroundColor, borderColor) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginBottom: 10 * height / 667,
    height: 27 * height / 667,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor,
    borderColor
  })
});
