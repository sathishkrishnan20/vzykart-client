import React, {useState, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {navigateByProp} from '../../../navigation';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {showToastByResponse} from '../../../components/Toast';
import {ISalesUser} from '../../../interfaces/classes/sales-user';
import SalesUserAction from '../../../actions/sales-user';
import {SalesUserView} from '../../../components/Sales-User/view';
import {getSellerId} from '../../../services/storage-service';

export function SellerViewSalesUsers(props: ComponentProp) {
  const salesUserAction = new SalesUserAction();
  let isRendered = useRef(false);
  const [salesUserListData, setSalesUserListData] = useState<ISalesUser[]>([]);
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
      const sellerId = await getSellerId();
      const sellerDataResponse = await salesUserAction.getAllSalesUserBySellerId(
        sellerId,
      );
      if (sellerDataResponse.success && isRendered.current) {
        const sellerList: ISalesUser[] = sellerDataResponse.data;
        setSalesUserListData(sellerList);
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
      <SalesUserView
        onClickAdd={() => navigateByProp(props, ROUTE_NAMES.sellerOrders)}
        salesUserListData={salesUserListData}
        isLoading={isLoading}
      />
    </ScrollView>
  );
}
