import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {Row, Col} from 'react-native-easy-grid';
import {IS_BIG_SCREEN} from '../../config';
import {ISeller} from '../../interfaces/classes/seller';
import {getImageLink} from '../../helpers';
import colors from '../../colors';
interface ISellerProp {
  data: ISeller;
  onClick: () => void;
  rowCount: number;
}
const marginWidth = 12;
export function Seller({data, onClick, rowCount}: ISellerProp) {
  const screenWidth = Dimensions.get('window').width;
  const avatarSize = Math.ceil(
    (screenWidth - (rowCount * marginWidth + marginWidth)) / rowCount,
  );
  return (
    <View>
      <Avatar
        onPress={onClick}
        size={avatarSize}
        source={{
          uri: getImageLink(
            data.sellerThumbImage &&
              (data.sellerThumbImage.optimizedDestinationPath as string),
          ),
        }}
        containerStyle={{
          flex: 2,
          marginLeft: IS_BIG_SCREEN ? 12 : 12,
          marginTop: 8,
        }}
      />
      <Row size={IS_BIG_SCREEN ? 12 : 0}>
        <Col size={IS_BIG_SCREEN ? 12 : 0}>
          <Text style={styles.mainText}>{data.sellerName}</Text>
          <Text numberOfLines={1} style={styles.subText}>
            {data.sellerDescription}
          </Text>
        </Col>
      </Row>
    </View>

    // <Row size={12} style={{margin: 4}}>
    //   <Col size={12}>
    //     <TouchableOpacity onPress={onClick}>
    //       <Card containerStyle={{borderRadius: 2, margin: 2}}>
    //         <Row size={IS_BIG_SCREEN ? 12 : 0} style={styles.rowStyle}>
    //           <Image
    //             source={{
    //               uri: getImageLink(
    //                 data.sellerThumbImage &&
    //                   (data.sellerThumbImage
    //                     .optimizedDestinationPath as string),
    //               ),
    //             }}
    //             resizeMode={'stretch'}
    //             style={{
    //               width: '100%',
    //               height: 200,
    //               alignItems: 'center',
    //             }}
    //           />
    //         </Row>
    //         <Row size={IS_BIG_SCREEN ? 12 : 0} style={styles.secondRow}>
    //           <Col size={IS_BIG_SCREEN ? 12 : 0}>
    //             <Text style={styles.mainText}>{data.sellerName}</Text>
    //             <Text style={styles.subText}>{data.sellerDescription}</Text>
    //           </Col>
    //         </Row>
    //       </Card>
    //     </TouchableOpacity>
    //   </Col>
    // </Row>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    height: 100,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondRow: {
    paddingTop: 10,
    paddingBottom: 10,

    height: 80,
    borderTopColor: '#000',
    borderTopWidth: 0.3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    marginTop: IS_BIG_SCREEN ? 8 : 4,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',

    color: colors.gray,
  },
  subText: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.gray,
  },
});
