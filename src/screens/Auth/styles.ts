import {StyleSheet} from 'react-native';
import colors from '../../colors';
import {IS_BIG_SCREEN} from '../../config';

export default StyleSheet.create({
  flexContainer1: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    position: 'relative',
    marginLeft: 10,
    marginTop: 5,
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  flexItem1: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: IS_BIG_SCREEN ? 36 : 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 24,
  },
  subText: {
    fontSize: 14.5,
    color: colors.white,
    margin: 8,
  },
  newUserRegisterText: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    color: colors.themePrimary,
  },
  vectorArt: {
    marginLeft: 4,
    marginTop: 2,
    marginBottom: 2,
  },
  flexItem2: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginRight: 10,
    marginTop: 5,
  },
  textSignIn: {
    fontSize: 18,
    color: '#4B5164',
    fontFamily: 'open-sans, sans-serif',
  },
  userNameInput: {
    borderColor: '#E0E1E4',
    paddingTop: 2,
    paddingBottom: 4,
    paddingLeft: 2,
    marginTop: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,

    width: 300,
    borderRadius: 10,
  },
  textInput: {
    padding: 4,
  },
  passwordInput: {
    borderColor: '#E0E1E4',
    marginTop: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingTop: 0.6,
    paddingBottom: 0.6,
    paddingLeft: 0.2,
    height: 41,
    width: 300,
    borderRadius: 10,
  },

  textForgotPassword: {
    marginTop: 1,
    marginLeft: 7,
    color: '#FF7E40',
    fontSize: 14.5,
    fontFamily: 'open-sans, sans-serif',
  },
  /*
 
  

  loginErrorMsg: {
    marginTop: 5,
    marginLeft: '5rem',
    fontSize: 15,
    color: 'red',
    fontFamily: 'open-sans, sans-serif',
    textAlign: 'center',
  },
  
  
 
  textUserNameInput: {
    fontFamily: 'open-sans, sans-serif',
    fontSize: '17.5px',
    fontWeight: 600,
    marginBottom: '-0.5px',
    marginTop: '20px',
    marginRight: '40px',
    color: '#4B5164',
  },
  
  
  
  loginOtpButton: {
    gridRowStart: 8,
    gridRowEnd: 10,
    marginTop: '20px',
    marginBottom: '1em',
    backgroundColor: 'white',
    height: 41,
    width: 300,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#F8712F',
    fontFamily: 'open-sans, sans-serif',
    color: '#F8712F',
  },
  */
});
