import React, {useEffect, useState} from 'react';
import {SellersList} from '../Sellers';
import {ComponentProp} from '../../interfaces';
import {Container, ImageSlider} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {Categories} from './Categories';
import {TopProducts} from './Products';

export function Home(_props: ComponentProp) {
  return (
    <Container>
      <ScrollView>
        <ImageSlider
          dataSource={[
            {url: 'http://placeimg.com/640/480/any'},
            {url: 'http://placeimg.com/640/480/any'},
            {url: 'http://placeimg.com/640/480/any'},
          ]}
        />

        <SellersList />
        <Categories />
        <TopProducts />
      </ScrollView>
    </Container>
  );
}
