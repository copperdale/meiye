import React, { Component } from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { hasAuthrity } from '../../utils/authority'

@connect((state) => ({
  queryResult: state.employee.queryResult,
  EmployeeRoleList: state.employee.EmployeeRoleList,
  loading: !!state.loading.effects['employee/queryEmployee'],
}))
export default class SearchResult extends Component {
  
  deleteEmployee = (id) => {
    this.props.dispatch({
      type: 'employee/deleteEmployee',
      payload: { id },
    });
  }

  updateStatusFlag = (id, statusFlag) => {
    this.props.dispatch({
      type: 'employee/updateStatusFlag',
      payload: {
        id,
        statusFlag
      }
    })
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '工号',
      dataIndex: 'jobNumber',
      key: 'jobNumber',
    }, {
      title: '员工类型',
      dataIndex: 'jobEmployeeType',
      render: (text) => {
        const typeMap = { '1': '试用期', '2': '正式', '3': '外聘' };
        return typeMap[text];
      },
    }, {
      title: '入职日期',
      dataIndex: 'jobEntryTime',
      render: (text) => {
        return moment(Number(text)).format('YYYY-MM-DD');
      }
    }, {
      title: '状态',
      dataIndex: 'enableFlag',
      render: (text) => {
        return `${text}` === '1' ? '启用' : '禁用';
      }
    }, {
      title: '职位',
      dataIndex: 'roleId',
      render: (text) => {
        return ((this.props.EmployeeRoleList || []).filter(item => `${item.id}` === `${text}`)[0] || {}).name || '';
      }
    }, {
      title: '操作',
      key: 'action',
      width: '180px',
      render: (text, record) => (
        <span>
          <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/employee-new',
              search: `isView=true&isEdit=false&id=${record.id}`,
            }}
          >查看
          </Link>
          {
            hasAuthrity('USER_MODIFY')
            &&  
            [
              <Divider type="vertical" />,
              <Link
              className="primary-blue"
              href="javascript:;"
              to={{
                pathname: '/employee-new',
                search: `isView=false&isEdit=true&id=${record.id}`,
              }}
            >编辑
            </Link>,
            <Divider type="vertical" />,
            <a
              className="primary-blue"
              href="javascript:void(0);"
              onClick={() => {this.updateStatusFlag(record.id, `${record.enableFlag}` === '1' ? '2' : '1')}}
            >{`${record.enableFlag}` === '1' ? '禁用' : '启用'}</a>
            ]
          }
          {
            hasAuthrity('USER_DELETE')
            &&
            [
              <Divider type="vertical" />,
              <Popconfirm
                title="确定要删除这条记录吗?"
                onConfirm={() => { this.deleteEmployee(record.id) }}
                okText="删除"
                cancelText="取消"
              >
                <a
                  className="primary-blue"
                  href="javascript:;"
                >删除
                </a>
              </Popconfirm>
            ]
          }
        </span>
      ),
    }];

    const data = this.props.queryResult.content || [];
    // data = data.concat(data).concat(data);
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
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={pager}
        loading={this.props.loading}
      />
    )
  }
}
