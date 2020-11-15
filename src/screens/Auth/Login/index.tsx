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
import {navigateByProp, getParamsByProp} from '../../../navigation';
import AuthAction from '../../../actions/auth';
import {ILoginAPI} from '../../../interfaces/actions/auth';
import {showToastByResponse} from '../../../components/Toast';
export default class Login extends React.Component<any, LoginState> {
  screenHeight: number;
  otpInput?: any;
  authAction: AuthAction;
  constructor(props: any) {
    super(props);
    this.state = {
      userEntry: '',
      password: '',
      userType: USER_TYPE.USER,
      isLoading: false,
      showPassword: false,
      enableForgotPassword: false,
      otpCode: '',
      userId: '',
    };
    this.authAction = new AuthAction();
    this.screenHeight = Dimensions.get('window').height - 60;
  }
  componentDidMount() {
    const params = getParamsByProp(this.props);
    if (params.userType === 'seller') {
      this.setState({userType: USER_TYPE.SALES_USER});
    }
    console.log(params);
  }
  async doForgotPassword() {
    const {userEntry, userType} = this.state;
    const response = await this.authAction.generateOTP(userType, {
      userEntry: userEntry,
    });
    showToastByResponse(response);
    if (response.success) {
      this.setState({enableForgotPassword: true, userId: response.data.userId});
    }
  }
  async setPasswordByOtp() {
    const {otpCode, userType, userId, password} = this.state;
    const response = await this.authAction.forgotPassword(userType, {
      issuerId: userId,
      otpCode,
      password,
    });
    if (response.success) {
      this.doLogin();
    } else {
      showToastByResponse(response);
    }
  }
  doLogin() {
    const {userEntry, password, userType} = this.state;
    const loginAPIRequest: ILoginAPI = {
      userEntry,
      password,
    };
    this.authAction.login(userType, loginAPIRequest, this.props);
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
      userEntry,
      password,
      userType,
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
          value={userEntry}
          onChangeText={(userEntry: string) => this.setState({userEntry})}
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
        {userType === USER_TYPE.USER ? (
          <TouchableOpacity
            onPress={() => navigateByProp(this.props, 'register')}>
            <Card.FeaturedTitle style={styles.newUserRegisterText}>
              New User? Register Here
            </Card.FeaturedTitle>
          </TouchableOpacity>
        ) : null}
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
