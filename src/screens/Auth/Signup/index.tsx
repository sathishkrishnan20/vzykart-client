import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
import {Input, Loader} from '../../../components/index';

import {USER_TYPE} from '../../../interfaces/enums';
import styles from '../styles';
import {IS_BIG_SCREEN, BACKGROUND_IMAGE_URL} from '../../../config';
import {navigateByProp} from '../../../navigation';
import {Radio} from '../../../components/Radio';
import AuthAction from '../../../actions/auth';
import {IRegisterAPI, ILoginAPI} from '../../../interfaces/actions/auth';
import {showToastByResponse, ErrorToast} from '../../../components/Toast';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {AuthContext} from '../../../routes';
const screenHeight: number = Dimensions.get('window').height - 60;
const authAction: AuthAction = new AuthAction();
export function SignUp(props: ComponentProp) {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(USER_TYPE.USER as USER_TYPE);
  const [isLoading, setIsLoading] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // @ts-ignore
  const {signIn} = React.useContext(AuthContext);
  const doSignUp = async () => {
    try {
      setIsLoading(true);
      const registerItem: IRegisterAPI = {
        password: password,
      };
      if (useEmail) {
        registerItem.email = email;
      } else {
        registerItem.mobileNumber = Number(mobileNumber);
      }
      const response = await authAction.register(userType, registerItem);
      setIsLoading(false);
      showToastByResponse(response);
      if (response.success) {
        const loginAPIRequest: ILoginAPI = {
          userEntry: useEmail ? email : mobileNumber,
          password,
        };
        authAction.login(userType, loginAPIRequest, props, {}, signIn);
      }
    } catch (error) {
      setIsLoading(false);
      ErrorToast({title: 'Failed', message: error.message || error});
    }
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
        <Card.Title>Register account to get Special orders</Card.Title>

        {/* <Radio
          buttons={['Email', 'Mobile Number']}
          selectedIndex={useEmail ? 0 : 1}
          containerWidth={400}
          onPress={(index: number) =>  setUseEmail(index === 0);}
        /> */}
        {!useEmail ? (
          <Input
            value={mobileNumber}
            onChangeText={(mobileNumber: string) =>
              setMobileNumber(mobileNumber)
            }
            returnKeyType={'next'}
            autoCapitalize="none"
            keyboardType={'numeric'}
            placeholder="Enter Mobile Number"
            blurOnSubmit={false}
          />
        ) : (
          <Input
            value={email}
            onChangeText={(email: string) => setEmail(email)}
            returnKeyType={'next'}
            keyboardType={'email-address'}
            autoCapitalize="none"
            placeholder="Enter Email"
            blurOnSubmit={false}
          />
        )}
        <Input
          value={password}
          onChangeText={(password: string) => setPassword(password)}
          returnKeyType={'done'}
          autoCapitalize="none"
          placeholder="Enter Password"
          blurOnSubmit={false}
          rightIcon={{
            name: 'eye',
            type: 'font-awesome',
            onPress: () => setShowPassword(!showPassword),
          }}
          secureTextEntry={showPassword ? false : true}
          onSubmitEditing={() => doSignUp()}
        />
        <Button
          loading={isLoading}
          onPress={() => doSignUp()}
          title="Register"
        />
        <TouchableOpacity
          onPress={() => navigateByProp(props, ROUTE_NAMES.login)}>
          <Card.FeaturedTitle style={styles.newUserRegisterText}>
            Existing User? Login Here
          </Card.FeaturedTitle>
        </TouchableOpacity>
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
          <Loader visible={isLoading} />
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
