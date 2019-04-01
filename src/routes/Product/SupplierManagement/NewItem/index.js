import {
  Spin, Breadcrumb
} from 'antd';
import { connect } from 'dva'

import AddForm from './AddForm';

@connect((state) => ({
  id: state['supplier-new'].id,
  loading: !!state.loading.effects['supplier-new/saveOrUpdateSupplier']
}))
class NewItem extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  render() {
    let title = '添加货源';
    if (this.props.id) {
      title = '编辑货源';
    }
    return (
      <Spin spinning={this.props.loading}>
        <Breadcrumb>
          <Breadcrumb.Item>货源管理</Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <AddForm />
      </Spin>
    );
  }
}

export default NewItem;