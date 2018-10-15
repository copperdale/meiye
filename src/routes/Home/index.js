import React, { Component } from 'react';
import { connect } from 'dva';
import IframeWrap from '../../components/IframeWrap'

@connect((state) => ({
  htmlString: state.home.htmlString || '<b>hello</b>',
}))
export default class NewItem extends Component {

  render() {
    return (
      <IframeWrap srcDoc={this.props.htmlString} />
    );
  }
};