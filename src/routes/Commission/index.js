import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QueryForm from './QueryForm'
import SearchResult from './SearchResult'

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
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => { this.props.dispatch(routerRedux.push('/commission/new')); }}>
            创建方案
          </Button>
        </div>
        <QueryForm />
        <SearchResult />
      </Fragment>
    );
  }
};