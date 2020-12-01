import React, {useEffect, useState} from 'react';
import {SellersList} from '../Sellers';
import {ComponentProp} from '../../interfaces';
import {Container, ImageSlider, ImageOnPress, ImageSliderDataSource, Button} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {Categories} from './Categories';
import {TopProducts} from './Products';
import MasterAction from '../../actions/master';
import {ISlider} from '../../interfaces/master';
import {getImageLink, getNavigationPramsFromImageSlider} from '../../helpers';
import {navigateByProp} from '../../navigation';
const masterAction = new MasterAction();
export function Home(props: ComponentProp) {
  const [sliders, setSliders] = useState([] as ISlider[]);
  const [sliderDataSource, setSliderSliderDataSource] = useState([] as ImageSliderDataSource[]);
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const sliderResp = await masterAction.getSliderImages();
    if (sliderResp.success) {
      const sliderImages: ImageSliderDataSource[] = sliderResp.data.map((item) => {
        return {
          url: getImageLink(item.sliderImage.optimizedDestinationPath) as string,
        };
      });
      setSliderSliderDataSource(sliderImages);
      setSliders(sliderResp.data);
    }
  };
  const onPressImage = (sliderData: ISlider) => {
    const {routeName, navigationParams} = getNavigationPramsFromImageSlider(sliderData);
    if (routeName) {
      navigateByProp(props, routeName, navigationParams);
    }
  };
  return (
    <Container>
      <ScrollView>
        <ImageSlider dataSource={sliderDataSource} onPress={(position: ImageOnPress) => onPressImage(sliders[position.index])} />
        <SellersList />
        <Categories />
        <TopProducts />
      </ScrollView>
    </Container>
  );
}
