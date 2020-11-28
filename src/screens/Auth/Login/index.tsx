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
import {USER_TYPE} from '../../../interfaces/enums';
import styles from '../styles';
import {BACKGROUND_IMAGE_URL, IS_BIG_SCREEN, APP_HEADER} from '../../../config';
import {navigateByProp, getParamsByProp} from '../../../navigation';
import AuthAction from '../../../actions/auth';
import {ILoginAPI} from '../../../interfaces/actions/auth';
import {showToastByResponse} from '../../../components/Toast';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {AuthContext} from '../../../routes';
import {getLoginRouteByUserType} from '../../../helpers';
import {Loader} from '../../../components';
import {Radio} from '../../../components/Radio';
const screenHeight: number = Dimensions.get('window').height - 60;
const authAction: AuthAction = new AuthAction();
const userTypes: {[x: string]: USER_TYPE} = {
  User: USER_TYPE.USER,
  'Sales User': USER_TYPE.SALES_USER,
  'Delivery Person': USER_TYPE.DELIVERY_PERSON,
};
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
  const [selectedUser, setSelectedUser] = useState(Object.keys(userTypes)[0]);
  // @ts-ignore
  const {signIn} = React.useContext(AuthContext);

  useEffect(() => {
    const params = getParamsByProp(props);
    if (params.userType === 'seller') {
      setUserType(USER_TYPE.SALES_USER);
    } else if (params.userType === 'admin') {
      setUserType(USER_TYPE.ADMIN);
    } else if (params.userType === 'delivery-person') {
      setUserType(USER_TYPE.DELIVERY_PERSON);
    }
  }, []);
  const doForgotPassword = async () => {
    try {
      setIsLoading(true);
      const response = await authAction.generateOTP(userType, {
        userEntry: userEntry,
      });
      setIsLoading(false);
      showToastByResponse(response);
      if (response.success) {
        setEnableForgotPassword(true);
        setUserId(response.data.userId);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const setPasswordByOtp = async () => {
    try {
      setIsLoading(true);
      const response = await authAction.forgotPassword(userType, {
        issuerId: userId,
        otpCode,
        password,
      });
      setIsLoading(false);
      if (response.success) {
        doLogin();
      } else {
        showToastByResponse(response);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const doLogin = async () => {
    try {
      setIsLoading(true);
      const loginAPIRequest: ILoginAPI = {
        userEntry,
        password,
      };
      await authAction.login(userType, loginAPIRequest, props, {}, signIn);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={styles.heading}>{APP_HEADER}</Text>
      </View>
    );
  };
  const getLabelSwitchUser = (userType: USER_TYPE) => {
    switch (userType) {
      case USER_TYPE.USER:
        return 'Login as Sales User';
      case USER_TYPE.SALES_USER:
        return 'Login as User';
      default:
        return '';
    }
  };

  const renderInputs = () => {
    return (
      <Card containerStyle={{borderRadius: 10}}>
        <Card.Title>
          {enableForgotPassword
            ? 'Reset your Password'
            : 'Sign in to your account'}
        </Card.Title>
        <Radio
          buttons={Object.keys(userTypes)}
          selectedItem={selectedUser}
          onPress={(selectedItem: string) => {
            setSelectedUser(selectedItem);
            setUserType(userTypes[selectedItem]);
          }}
        />
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
