import React, { Component } from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

@connect((state) => {
  return {
    queryResult: state.supplier.queryResult,
    loading: !!state.loading.effects['supplier/getSupplierList']
  }
})
export default class SearchResult extends Component {

  deleteSupplier = (id) => {
    this.props.dispatch({
      type: 'supplier/deleteSupplier',
      payload: {
        id
      }
    });
  }

  render() {
    const columns = [{
      title: '厂商名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '厂商地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '联系人',
      dataIndex: 'contacts',
      key: 'contacts'
    }, {
      title: '联系电话',
      dataIndex: 'contactsPhone',
      key: 'contactsPhone'
    }, {
      title: '操作',
      key: 'action',
      width: 140,
      render: (text, record) => (
        <span>
          {/* <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/product-new',
              search: `selecteDishTypeId=${this.props.selecteDishTypeId}&isView=1&id=${record.id}&addtype=${record.type}`,
            }}
          >查看
          </Link>
          <Divider type="vertical" /> */}
          <a
            className="primary-blue"
            href="javascript:;"
            onClick={() => {
              this.props.dispatch({
                type: 'supplier-new/updateState',
                payload: {
                  formData: {
                    name: { value: record.name },
                    contacts: { value: record.contacts },
                    contactsPhone: { value: record.contactsPhone },
                    address: { value: record.address }
                  }
                }
              })
              this.props.dispatch(routerRedux.push({
                pathname: '/supplier-new',
                search: `id=${record.id}`
              }))
            }}
          >编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除这条记录吗?"
            onConfirm={() => { this.deleteSupplier(record.id) }}
            okText="删除"
            cancelText="取消"
          >
            <a
              className="primary-blue"
              href="javascript:;"
            >删除
            </a>
          </Popconfirm>
        </span>
      ),
    }];

    const data = this.props.queryResult;
    // data = data;
    const pager = {
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['2', '5', '10', '20', '30', '40', '50', '100'],
      showTotal: (total, range) => { // eslint-disable-line
        return (
          <div>
            共{total}条&nbsp;
          </div>
        );
      },
      showQuickJumper: true,
      size: 'small',
    };
    return (
      <Table
        style={{ marginTop: '8px' }}
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        rowKey="id"
        pagination={pager}
        loading={this.props.loading}
      />
    )
  }
}
