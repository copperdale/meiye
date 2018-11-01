import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import IframeWrap from '../../components/IframeWrap'
import { commercialSetting } from '../../services/URL';

@connect((state) => ({ // eslint-disable-line
  // htmlString: state.commercialSetting.htmlString || '<b>hello</b>',
}))
export default class Report extends Component {

  render() {
console.log('##################', commercialSetting);
    return (
      <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0 }}>
        <IframeWrap
          // srcDoc="数据玩儿命加载中"
          src={commercialSetting()}
        />
      </div>
    );
  }
};