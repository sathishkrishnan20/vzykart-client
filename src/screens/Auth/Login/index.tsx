import React, {useEffect, useState, useRef} from 'react';
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
import {Card} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
import {Input, Button} from '../../../components/index';
import {LoginState} from '../../../interfaces/classes/auth';
import {USER_TYPE} from '../../../interfaces/enums';
import styles from '../styles';
import {BACKGROUND_IMAGE_URL, IS_BIG_SCREEN} from '../../../config';
import {navigateByProp, getParamsByProp} from '../../../navigation';
import AuthAction from '../../../actions/auth';
import {ILoginAPI} from '../../../interfaces/actions/auth';
import {showToastByResponse} from '../../../components/Toast';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
const screenHeight: number = Dimensions.get('window').height - 60;
const authAction: AuthAction = new AuthAction();

export function Login(props: ComponentProp) {
  let otpInput = useRef();
  const [userEntry, setUserEntry] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOTpCode] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState(USER_TYPE.USER as USER_TYPE);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enableForgotPassword, setEnableForgotPassword] = useState(false);

  useEffect(() => {
    const params = getParamsByProp(props);
    if (params.userType === 'seller') {
      setUserType(USER_TYPE.SALES_USER);
    }
  }, []);
  const doForgotPassword = async () => {
    const response = await authAction.generateOTP(userType, {
      userEntry: userEntry,
    });
    showToastByResponse(response);
    if (response.success) {
      setEnableForgotPassword(true);
      setUserId(response.data.userId);
    }
  };
  const setPasswordByOtp = async () => {
    const response = await authAction.forgotPassword(userType, {
      issuerId: userId,
      otpCode,
      password,
    });
    if (response.success) {
      doLogin();
    } else {
      showToastByResponse(response);
    }
  };
  const doLogin = () => {
    const loginAPIRequest: ILoginAPI = {
      userEntry,
      password,
    };
    authAction.login(userType, loginAPIRequest, props);
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={styles.heading}>V-Cart</Text>
      </View>
    );
  };

  const renderInputs = () => {
    return (
      <Card containerStyle={{borderRadius: 10}}>
        <Card.Title>
          {enableForgotPassword
            ? 'Reset your Password'
            : 'Sign in to your account'}
        </Card.Title>
        <Input
          value={userEntry}
          onChangeText={(userEntry: string) => setUserEntry(userEntry)}
          returnKeyType={'next'}
          autoCapitalize="none"
          placeholder="Email/Mobile Number"
          blurOnSubmit={false}
        />
        {enableForgotPassword ? (
          <OTPTextInput
            ref={(e: any) => (otpInput = e)}
            inputCount={6}
            textInputStyle={{width: 40}}
            tintColor={'#F68535'}
            inputCellLength={1}
            handleTextChange={(otpCode: string) => setOTpCode(otpCode)}
          />
        ) : null}

        <Input
          value={password}
          onChangeText={(password: string) => setPassword(password)}
          returnKeyType={'next'}
          autoCapitalize="none"
          rightIcon={{
            name: 'eye',
            type: 'font-awesome',
            onPress: () => setShowPassword(!showPassword),
          }}
          placeholder="Enter Password"
          blurOnSubmit={false}
          secureTextEntry={showPassword ? false : true}
          onSubmitEditing={() => doLogin()}
        />

        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginTop: -8}}
          onPress={() => doForgotPassword()}>
          <Text style={styles.textForgotPassword}>Forgot?</Text>
        </TouchableOpacity>

        <Button
          onPress={() =>
            enableForgotPassword ? setPasswordByOtp() : doLogin()
          }
          style={{marginTop: 4}}
          loading={isLoading}
          title={enableForgotPassword ? 'Set Password' : 'Login'}
        />

        {userType === USER_TYPE.USER ? (
          <TouchableOpacity
            onPress={() => navigateByProp(props, ROUTE_NAMES.register)}>
            <Card.FeaturedTitle style={styles.newUserRegisterText}>
              New User? Register Here
            </Card.FeaturedTitle>
          </TouchableOpacity>
        ) : null}
      </Card>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: BACKGROUND_IMAGE_URL,
        }}
        style={[styles.imageBg, {height: screenHeight}]}>
        <ScrollView>
          {IS_BIG_SCREEN ? (
            <Grid>
              <Col>{renderTitle()}</Col>
              <Col style={{marginTop: 100, marginRight: 20, marginLeft: 20}}>
                {renderInputs()}
              </Col>
            </Grid>
          ) : (
            <View>
              <View>{renderTitle()}</View>
              <View style={{marginTop: 80}}>{renderInputs()}</View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
