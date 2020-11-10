import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface IState {
  headerData: string[];
  valueData: string[][];
}

export default class TableGrid extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Lable4'],
      values: [
        [1, 2, 3, 4],
        [11, 22, 33, 5],
        [111, 222, 333, 6],
      ],
    };
  }
  renderValues = (values: any) => {
    return values.map((item: any, key: any) => {
      return this.renderCell(item, key, false);
    });
  };
  getStyle = (index: any) => {
    switch (index) {
      default:
        return [styles.row_1, styles.rowDefault];
    }
  };
  renderCell = (
    value: React.ReactNode,
    key: string | number | null | undefined,
    isHeader: boolean,
  ) => {
    return (
      <View style={this.getStyle(key)} key={key}>
        <Text
          style={isHeader ? {fontWeight: 'bold', color: '#fff'} : {}}
          key={key}>
          {value}
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View
        style={[
          styles.row,
          {
            backgroundColor: '#F45540',
            height: 60,
            justifyContent: 'center',
            alignContent: 'center',
          },
        ]}>
        {this.state.labels.map((item: any, key: any) =>
          this.renderCell(item, key, true),
        )}
      </View>
    );
  };

  renderData() {
    return (
      <View>
        {this.state.values.map(
          (item: any, key: string | number | null | undefined) => (
            <View
              style={[styles.row, {backgroundColor: '#F2F2F2', height: 40}]}
              key={key}>
              {this.renderValues(item)}
            </View>
          ),
        )}
      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {this.renderHeader()}
        {this.renderData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowDefault: {
    borderColor: '#C1C0B9',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_1: {
    flex: 1,
  },
  valueStyle: {
    flex: 1,
  },
});
