import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
// @ts-ignore
import OTPTextInput from 'react-native-otp-textinput';
import {Button, Card} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
import {Input} from '../../../components/index';
import {LoginState} from '../../../interfaces/classes/auth';
import {USER_TYPE} from '../../../interfaces/enums';
import styles from '../styles';
import {IS_WEB, BACKGROUND_IMAGE_URL} from '../../../config';
import {navigateByProp} from '../../../navigation';

export default class Login extends React.Component<any, LoginState> {
  screenHeight: number;
  otpInput?: any;
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userType: USER_TYPE.USER,
      isLoading: false,
      showPassword: false,
      enableForgotPassword: false,
      otpCode: '',
    };
    this.screenHeight = Dimensions.get('window').height - 60;
  }
  doForgotPassword() {
    this.setState({enableForgotPassword: true});
  }
  setPasswordByOtp() {}
  doLogin() {
    navigateByProp(this.props, 'home');
  }

  renderTitle() {
    return (
      <View>
        <Text style={styles.heading}>V-Cart</Text>
      </View>
    );
  }

  renderInputs() {
    const {
      userName,
      password,
      isLoading,
      showPassword,
      enableForgotPassword,
    } = this.state;
    return (
      <Card containerStyle={{borderRadius: 10}}>
        <Card.Title>
          {enableForgotPassword
            ? 'Reset your Password'
            : 'Sign in to your account'}
        </Card.Title>
        <Input
          value={userName}
          onChangeText={(userName: string) => this.setState({userName})}
          returnKeyType={'next'}
          autoCapitalize="none"
          placeholder="Email/Mobile Number"
          blurOnSubmit={false}
        />
        {enableForgotPassword ? (
          <OTPTextInput
            ref={(e: any) => (this.otpInput = e)}
            inputCount={6}
            textInputStyle={{width: 40}}
            tintColor={'#F68535'}
            inputCellLength={1}
            handleTextChange={(otpCode: string) => this.setState({otpCode})}
          />
        ) : null}

        <Input
          value={password}
          onChangeText={(password: string) => this.setState({password})}
          returnKeyType={'next'}
          autoCapitalize="none"
          rightIcon={{
            name: 'eye',
            type: 'font-awesome',
            onPress: () => this.setState({showPassword: !showPassword}),
          }}
          placeholder="Enter Password"
          blurOnSubmit={false}
          secureTextEntry={showPassword ? false : true}
          onSubmitEditing={() => console.log('Do Login')}
        />

        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginTop: -8}}
          onPress={() => this.doForgotPassword()}>
          <Text style={styles.textForgotPassword}>Forgot?</Text>
        </TouchableOpacity>
        <Button
          onPress={() =>
            enableForgotPassword ? this.setPasswordByOtp() : this.doLogin()
          }
          style={{marginTop: 4}}
          loading={isLoading}
          title={enableForgotPassword ? 'Set Password' : 'Login'}
        />
        <TouchableOpacity
          onPress={() => navigateByProp(this.props, 'register')}>
          <Card.FeaturedTitle style={styles.newUserRegisterText}>
            New User? Register Here
          </Card.FeaturedTitle>
        </TouchableOpacity>
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={{
            uri: BACKGROUND_IMAGE_URL,
          }}
          style={[styles.imageBg, {height: this.screenHeight}]}>
          <ScrollView>
            {IS_WEB ? (
              <Grid>
                <Col>{this.renderTitle()}</Col>
                <Col style={{marginTop: 100, marginRight: 20, marginLeft: 20}}>
                  {this.renderInputs()}
                </Col>
              </Grid>
            ) : (
              <View>
                <View>{this.renderTitle()}</View>
                <View style={{marginTop: 80}}>{this.renderInputs()}</View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
