import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {IViewTableComponentProp, TableHeader} from '../../interfaces/table-component';
import {CRUD} from '../../interfaces/enums';
import colors from '../../colors';
import {IS_WEB} from '../../config';
import {ConfirmModal} from '../Modal/confirm-modal';

class TableComponent extends Component<IViewTableComponentProp, {deleteItemUniqueId: string; visibleConfirmCartDeleteModal: boolean}> {
  constructor(props: IViewTableComponentProp) {
    super(props);
    this.state = {
      deleteItemUniqueId: '',
      visibleConfirmCartDeleteModal: false,
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  renderValues = (valueObject: any, _valueIndex: number) => {
    const {headerData} = this.props;
    return headerData.map((headerItem, headerIndex: number) => {
      return this.renderCell(valueObject[headerItem.node], headerIndex, false);
    });
  };

  renderActions = (actionButtons: CRUD[], uniqueId: string) => {
    const {viewAction, editAction, deleteAction} = this.props;
    return (
      <View
        style={[
          styles.row_1,
          styles.rowDefault,
          {flexDirection: 'row'},
          this.props.widthData
            ? {
                width: this.props.widthData[this.props.headerData.length],
              }
            : {},
        ]}>
        {actionButtons.includes(CRUD.VIEW) ? this.renderActionIcon('eye', uniqueId, viewAction) : null}
        {actionButtons.includes(CRUD.UPDATE) ? this.renderActionIcon('pencil-sharp', uniqueId, editAction) : null}
        {actionButtons.includes(CRUD.DELETE) ? this.renderActionIcon('trash', uniqueId, this.onDeleteHandler) : null}
      </View>
    );
  };

  renderActionIcon(iconName: string, uniqueId: string, action?: (id: string) => void) {
    return (
      <TouchableOpacity>
        <Icon onPress={() => (action ? action(uniqueId) : null)} style={{margin: 4}} color={colors.themePrimary} type={'ionicon'} name={iconName} />
      </TouchableOpacity>
    );
  }

  onDeleteHandler(uniqueId: string) {
    this.setState({deleteItemUniqueId: uniqueId, visibleConfirmCartDeleteModal: true});
  }

  renderCell = (value: React.ReactNode, index: number, isHeader: boolean) => {
    return (
      <View style={[styles.row_1, styles.rowDefault, this.props.widthData ? {width: this.props.widthData[index]} : {}]} key={index}>
        <Text style={isHeader ? {fontWeight: 'bold', color: '#fff'} : {}} key={'' + Math.random() + index}>
          {value}
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    const {headerData, showActions, actionButtons} = this.props;
    return (
      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.themePrimary,
            height: 60,
            justifyContent: 'center',
            alignContent: 'center',
          },
        ]}>
        {headerData.map((item: TableHeader, index: number) => this.renderCell(item.label, index, true))}
        {showActions && actionButtons ? this.renderCell('', headerData.length, true) : null}
      </View>
    );
  };

  renderData() {
    const {showActions, actionButtons, uniqueIdKeyName} = this.props;
    return (
      <View>
        {this.props.valueData.map((item: any, key: number) => (
          <View style={[styles.row, {backgroundColor: '#F2F2F2', height: 40}]} key={key}>
            {this.renderValues(item, key)}
            {showActions && actionButtons ? this.renderActions(actionButtons, item[uniqueIdKeyName]) : null}
          </View>
        ))}
      </View>
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {this.renderHeader()}
        {this.renderData()}

        <ConfirmModal
          title="Delete"
          subTitle={'Are you Sure Wants to Delete?'}
          visible={this.state.visibleConfirmCartDeleteModal}
          toggleModal={(value: boolean) => this.setState({visibleConfirmCartDeleteModal: value})}
          buttons={[
            {
              title: 'Cancel',
              onPress: () => this.setState({visibleConfirmCartDeleteModal: false}),
            },
            {
              color: colors.red,
              title: 'Delete',
              onPress: () => {
                this.setState({visibleConfirmCartDeleteModal: false});
                if (this.props.deleteAction) {
                  this.props.deleteAction(this.state.deleteItemUniqueId);
                }
              },
            },
          ]}
        />
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
    width: IS_WEB ? 140 : 80,
  },
  row_1: {
    //  flex: 1,
  },
  valueStyle: {
    flex: 1,
  },
});
export default TableComponent;
