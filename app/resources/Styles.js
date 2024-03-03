import { StyleSheet, Platform } from "react-native";

import Constants from "./Constants";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  // container_height: {
  //   height: "100vh"
  // },

  // container
  containerWhite: {
    flex: 1,
    backgroundColor: Constants.COLOR_CODE.white,
  },
  containerGray: {
    flex: 1,
    backgroundColor: Constants.COLOR_CODE.gray,
  },
  containerPurple: {
    flex: 1,
    backgroundColor: Constants.COLOR_CODE.purple,
  },
  containerRed: {
    flex: 1,
    backgroundColor: Constants.COLOR_CODE.red,
  },

  // bg
  bgWhite: {
    backgroundColor: Constants.COLOR_CODE.white,
  },
  bgGray: {
    backgroundColor: Constants.COLOR_CODE.gray,
  },
  bgPurple: {
    backgroundColor: Constants.COLOR_CODE.purple,
  },
  bgBlue: {
    backgroundColor: Constants.COLOR_CODE.blue,
  },
  bgRed: {
    backgroundColor: Constants.COLOR_CODE.red,
  },
  bgGreen: {
    backgroundColor: Constants.COLOR_CODE.green,
  },
  bgYellow: {
    backgroundColor: Constants.COLOR_CODE.yellow,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },

  containerGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // position
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerJustify: {
    justifyContent: "center",
  },
  centerAlignItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  around: {
    justifyContent: "space-around",
  },
  evenly: {
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  absolute: {
    position: "absolute",
  },
  absoluteM: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  positionRelative: {
    position: "relative",
  },
  letterSpace05: {
    letterSpacing: -0.5,
  },

  //align
  alignPrimaryStart: {
    justifyContent: "flex-start",
  },
  alignPrimaryEnd: {
    justifyContent: "flex-end",
  },
  alignSecondaryStart: {
    alignItems: "flex-start",
  },
  alignSecondaryEnd: {
    alignItems: "flex-end",
  },
  alignSecondaryCenter: {
    alignItems: "center",
  },
  alignFlexWrap: {
    flexWrap: "wrap",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignContentStart: {
    alignContent: "flex-start",
  },

  // icon
  icon96: {
    width: 96,
    height: 96,
  },
  icon84: {
    width: 84,
    height: 84,
  },
  icon72: {
    width: 72,
    height: 72,
  },
  icon64: {
    width: 64,
    height: 64,
  },
  icon54: {
    width: 54,
    height: 54,
  },
  icon48: {
    width: 48,
    height: 48,
  },
  icon42: {
    width: 42,
    height: 42,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  icon28: {
    width: 28,
    height: 28,
  },
  icon24: {
    width: 24,
    height: 24,
  },
  icon20: {
    width: 20,
    height: 20,
  },
  icon18: {
    width: 18,
    height: 18,
  },
  icon14: {
    width: 14,
    height: 14,
  },
  icon12: {
    width: 12,
    height: 12,
  },

  // margin
  m5: {
    margin: 5,
  },
  m6: {
    margin: 6,
  },
  m10: {
    margin: 10,
  },
  m12: {
    margin: 12,
  },
  m16: {
    margin: 16,
  },
  m20: {
    margin: 20,
  },
  m24: {
    margin: 24,
  },

  mLR6: {
    marginLeft: 6,
    marginRight: 6,
  },
  mLR8: {
    marginLeft: 8,
    marginRight: 8,
  },
  mLR10: {
    marginLeft: 10,
    marginRight: 10,
  },
  mLR12: {
    marginLeft: 12,
    marginRight: 12,
  },
  mLR16: {
    marginLeft: 16,
    marginRight: 16,
  },
  mLR20: {
    marginLeft: 20,
    marginRight: 20,
  },
  mLR24: {
    marginLeft: 24,
    marginRight: 24,
  },
  mTB6: {
    marginTop: 6,
    marginBottom: 6,
  },
  mTB12: {
    marginTop: 12,
    marginBottom: 12,
  },
  mTB24: {
    marginTop: 24,
    marginBottom: 24,
  },
  mTB48: {
    marginTop: 48,
    marginBottom: 48,
  },

  mT20: {
    marginTop: 20,
  },
  mT10: {
    marginTop: 10,
  },

  mB220: {
    paddingBottom: 220,
  },
  mB2: {
    paddingBottom: 1,
  },

  // padding
  p5: {
    padding: 5,
  },
  p6: {
    padding: 6,
  },
  p10: {
    padding: 10,
  },
  p12: {
    padding: 12,
  },
  p14: {
    padding: 14,
  },
  p15: {
    padding: 15,
  },
  p16: {
    padding: 16,
  },
  p20: {
    padding: 20,
  },
  p24: {
    padding: 24,
  },
  p38: {
    padding: 38,
  },

  //border
  borderGray: {
    borderColor: Constants.COLOR_CODE.gray,
    borderWidth: 1,
  },
  borderRed: {
    borderColor: Constants.COLOR_CODE.red,
    borderWidth: 1,
  },
  borderRed3: {
    borderColor: Constants.COLOR_CODE.red,
    borderWidth: 3,
  },
  borderGreen: {
    borderWidth: 1,
    borderColor: "green",
  },
  borderPurple: {
    borderColor: Constants.COLOR_CODE.purple,
    borderWidth: 1,
  },
  borderWhite: {
    borderColor: Constants.COLOR_CODE.white,
    borderWidth: 1,
  },
  borderBlue: {
    borderColor: Constants.COLOR_CODE.blue,
    borderWidth: 1,
  },
  borderBlue2: {
    borderColor: Constants.COLOR_CODE.blue2,
    borderWidth: 1,
  },

  //border radius
  borderRadius24: {
    borderRadius: 24,
  },
  borderRadius20: {
    borderRadius: 20,
  },
  borderRadius16: {
    borderRadius: 16,
  },
  borderRadius12: {
    borderRadius: 12,
  },
  borderRadius14: {
    borderRadius: 14,
  },
  borderRadius8: {
    borderRadius: 8,
  },

  // text size
  text42: {
    fontSize: Constants.FONT_SIZE.size42,
  },
  text38: {
    fontSize: Constants.FONT_SIZE.size38,
  },
  text34: {
    fontSize: Constants.FONT_SIZE.size34,
  },
  text32: {
    fontSize: Constants.FONT_SIZE.size32,
  },
  text30: {
    fontSize: Constants.FONT_SIZE.size30,
  },
  text28: {
    fontSize: Constants.FONT_SIZE.size28,
  },
  text26: {
    fontSize: Constants.FONT_SIZE.size26,
  },
  text24: {
    fontSize: Constants.FONT_SIZE.size24,
  },
  text22: {
    fontSize: Constants.FONT_SIZE.size22,
  },
  text20: {
    fontSize: Constants.FONT_SIZE.size20,
  },
  text18: {
    fontSize: Constants.FONT_SIZE.size18,
  },
  text17: {
    fontSize: Constants.FONT_SIZE.size17,
  },
  text16: {
    fontSize: Constants.FONT_SIZE.size16,
  },
  text15: {
    fontSize: Constants.FONT_SIZE.size15,
  },
  text14: {
    fontSize: Constants.FONT_SIZE.size14,
  },
  text13: {
    fontSize: Constants.FONT_SIZE.size13,
  },
  text12: {
    fontSize: Constants.FONT_SIZE.size12,
  },
  text11: {
    fontSize: Constants.FONT_SIZE.size11,
  },
  text10: {
    fontSize: Constants.FONT_SIZE.size10,
  },
  text8: {
    fontSize: Constants.FONT_SIZE.size8,
  },
  text6: {
    fontSize: Constants.FONT_SIZE.size6,
  },
  textMonPay: {
    color: Constants.COLOR_CODE.monPay,
  },

  fontWeight300: {
    fontWeight: "300",
  },
  fontWeight400: {
    fontWeight: "400",
  },
  fontWeight500: {
    fontWeight: "500",
  },
  fontWeight600: {
    fontWeight: "600",
  },
  fontWeight700: {
    fontWeight: "700",
  },

  // text color
  textRed: {
    color: Constants.COLOR_CODE.red,
  },
  textBlack: {
    color: Constants.COLOR_CODE.black,
  },
  textWhite: {
    color: Constants.COLOR_CODE.white,
  },
  textWhite50: {
    color: Constants.COLOR_CODE.white50,
  },
  textGray: {
    color: Constants.COLOR_CODE.gray,
  },
  textGreen: {
    color: Constants.COLOR_CODE.green,
  },
  textLightBlue: {
    color: Constants.COLOR_CODE.lightBlue,
  },
  textDarkBlue: {
    color: Constants.COLOR_CODE.darkBlue,
  },
  textDarkBlue80: {
    color: Constants.COLOR_CODE.darkBlue80,
  },
  textBlue: {
    color: Constants.COLOR_CODE.blue,
  },
  textBlue2: {
    color: Constants.COLOR_CODE.blue2,
  },
  textBlue280: {
    color: Constants.COLOR_CODE.blue280,
  },

  // text style
  uppercase: {
    textTransform: "uppercase",
  },
  lowercase: {
    textTransform: "lowercase",
  },
  textBold: {
    fontWeight: "bold",
  },
  textAlign: {
    textAlign: "center",
  },

  // shadow
  redShadow: {
    margin: 4,
    shadowColor: Constants.COLOR_CODE.red,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  grayShadow: {
    margin: 4,
    shadowColor: Constants.COLOR_CODE.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  blueShadow: {
    margin: 4,
    shadowColor: Constants.COLOR_CODE.blue,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  //opacity
  opacity60: {
    opacity: 0.6,
  },
  //shadow
  black38Border: {
    borderColor: Constants.COLOR_CODE.black38,
    borderWidth: 1,
  },

  textBlack68: {
    color: Constants.COLOR_CODE.black68,
  },

  borderBottom: {
    borderBottomColor: Constants.COLOR_CODE.palettes200,
    borderBottomWidth: 1,
  },

  containerColumn: {
    height: 46,
    justifyContent: "space-between",
  },

  // =======================

  root: {padding: 10},
  title: { fontSize: 20},
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 10,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
});
