import React, { Component, Fragment } from 'react';
import { Button, Radio, Tabs, Card, Icon, Input, Modal } from 'antd';
import { connect } from 'dva';
import QueryForm from './QueryForm'

@connect((state) => ({
  // tables: state.setting.tables,
  // selectedTableAreaId: state.setting.selectedTableAreaId,
  // tableArea: state.setting.tableArea,
  // isEdit: state.setting.isEdit,
}))
export default class Commission extends Component {
  
  render() {
    return (
      <Fragment>
        <QueryForm />
      </Fragment>
    );
  }
};