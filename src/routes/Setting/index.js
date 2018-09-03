import React, { Component } from 'react';
import { Button, Radio, Tabs, Card, Icon, Input } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router';

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

@connect((state) => ({
  tables: state.setting.tables,
  selectedTableAreaId: state.setting.selectedTableAreaId,
  tableArea: state.setting.tableArea,
}))
export default class NewItem extends Component {

  save = () => {
    if (this.props.isEdit) {
      this.props.dispatch({
        type: 'setting/update',
      });
    } else {
      this.props.dispatch({
        type: 'setting/new',
      });
    }
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {

  }

  remove = (targetKey) => {

  }
  
  render() {
    console.log(this.props.tables)
    return (
      <Tabs
        defaultActiveKey={this.props.selectedTableAreaCode}
        onChange={(activeKey) => {
          this.props.dispatch({
            type: 'setting/updateState',
            payload: { selectedTableAreaId: activeKey },
          });
          this.props.dispatch({
            type: 'setting/loadTablesByAreaId',
          });
        }}
        onEdit={this.onEdit}
      >
        {
          this.props.tableArea.map((area) => {
            return (
              <TabPane tab={area.areaName} key={area.id || '-1'}>
                {
                  `${area.id}` === `${this.props.selectedTableAreaId}`
                  &&
                  this.props.tables.map((table) => {
                    if (table.id) {
                      return (
                        <Card
                          title={<span title={table.tableName}>{table.tableName}</span>}
                          bordered={false}
                          style={{ width: 120, display: 'inline-block', marginTop: '16px', marginRight: '16px' }}
                        >
                          <Icon style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }} type="edit" theme="twoTone" />
                          &nbsp;
                          &nbsp;
                          <Icon style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }} type="delete" theme="twoTone" />
                        </Card>
                      )
                    } else {
                      return (
                        <Card
                          title={
                            <Input
                              size="small"
                              value={table.tableName}
                              onChange={(e) => {
                                let cTables = this.props.tables;
                                cTables = cTables.map((item) => {
                                  if (!item.id) {
                                    item.tableName = e.target.value;
                                  }
                                  return item;
                                });
                                this.props.dispatch({
                                  type: 'setting/updateState',
                                  payload: {
                                    tables: JSON.parse(JSON.stringify(cTables)),
                                  },
                                });
                              }}
                            />
                          }
                          bordered={false}
                          style={{ width: 120, display: 'inline-block', marginTop: '16px', marginRight: '16px' }}
                        >
                          <Icon style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }} type="edit" theme="twoTone" />
                          &nbsp;
                          &nbsp;
                          <Icon style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }} type="delete" theme="twoTone" />
                        </Card>
                      )
                    }
                  })
                }
                
                {
                  this.props.tables.filter((item) => {
                    return !item.id;
                  }).length === 0
                  &&
                  (
                    <Icon
                      onClick={() => {
                        const cTables = this.props.tables;
                        cTables.push({ tableName: '' });
                        this.props.dispatch({
                          type: 'setting/updateState',
                          payload: {
                            tables: JSON.parse(JSON.stringify(cTables)),
                          },
                        });
                      }}
                      style={{ fontSize: '48px', cursor: 'pointer', color: '#ee5e1f' }}
                      type="plus-circle"
                      theme="twoTone"
                    />
                  )
                }
              </TabPane>
            );
          })
        }
        
      </Tabs>
    );
  }
};