import React, {useState, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {navigateByProp} from '../../../navigation';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {showToastByResponse} from '../../../components/Toast';
import {IDeliveryPerson} from '../../../interfaces/classes/delivery-person';
import DeliveryPersonAction from '../../../actions/delivery-person';
import {DeliveryPersonView} from './delivery-person-table';
import {Loader} from '../../../components/Loader';

export function AdminViewDeliveryPersons(props: ComponentProp) {
  const deliveryPersonAction = new DeliveryPersonAction();
  let isRendered = useRef(false);
  const [deliveryPersonListData, setDeliveryPersonData] = useState<
    IDeliveryPerson[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isRendered.current = true;
    getSalesUserData();
    return () => {
      isRendered.current = false;
    };
  }, []);

  const getSalesUserData = async () => {
    try {
      setIsLoading(true);
      const sellerDataResponse = await deliveryPersonAction.getAllDeliveryPersons();
      if (sellerDataResponse.success && isRendered.current) {
        const sellerList: IDeliveryPerson[] = sellerDataResponse.data;
        setDeliveryPersonData(sellerList);
      } else {
        showToastByResponse(sellerDataResponse);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView horizontal={true}>
      <Loader visible={isLoading} />
      <DeliveryPersonView
        onClickAdd={() =>
          navigateByProp(props, ROUTE_NAMES.adminAddDeliveryPersons)
        }
        ListData={deliveryPersonListData}
        isLoading={isLoading}
      />
    </ScrollView>
  );
}
