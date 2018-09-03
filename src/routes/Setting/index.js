import React, { Component } from 'react';
import { Button, Radio, Tabs, Card, Icon, Row, Col } from 'antd';
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
    // console.log(this.props.addtype)
    return (
      <Tabs
        defaultActiveKey={this.props.selectedTableAreaId}
        onChange={(activeKey) => { this.props.dispatch({ type: 'setting/updateState', payload: { selectedTableAreaId: activeKey } }) }}
        onEdit={this.onEdit}
      >
        {
          this.props.tableArea.map((area) => {
            return (
              <TabPane tab={area.name} key={area.id || '-1'}>
                {
                  `${area.id}` === `${this.props.selectedTableAreaId}`
                  ?

                  this.props.tables.map((table) => {
                    return (
                      <Card
                        title={table.name}
                        bordered={false}
                        style={{ width: 120, display: 'inline-block', marginTop: '16px', marginRight: '16px' }}
                        actions={[
                          <Icon type="edit" theme="twoTone" />,
                          <Icon type="delete" theme="twoTone" />,
                        ]}
                      />
                    )
                  })
                  :
                  ''
                }
              </TabPane>
            );
          })
        }
        
      </Tabs>
    );
  }
};