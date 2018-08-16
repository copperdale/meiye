import React, { Component } from 'react';
import { Row, Col, Card, Button, List, Breadcrumb } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import QueryForm from './QueryForm';
import SerachResult from './SearchResult';

export default class Product extends Component {
  render() {
    return (
      <PageHeaderLayout>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <h4>品项类别管理</h4>
              <div style={{ lineHeight: '32px' }}>
                一级分类2个，二级分类5个
                <Button type="primary" style={{ float: 'right' }}>创建一级分类</Button>
              </div>

              <div style={{ marginTop: '8px', padding: '0px 4px', backgroundColor: '#ccc', height: '32px', lineHeight: '32px', textAlign: 'right' }}>
                <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
                <a href="javascript:void(0)">编辑</a>&nbsp;
                <a href="javascript:void(0)">删除</a> &nbsp;
                <Button size="small" type="primary">添加下一级分类</Button>
              </div>
              <List
                size="small"
                itemLayout="horizontal"
                split={false}
                dataSource={[
                  { title: '水光针' },
                  { title: '水光针' },
                  { title: '水光针' },
                ]}
                renderItem={(item) => (
                  <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
                    <span style={{ paddingLeft: '20px' }}>{item.title}</span>
                  </List.Item>
                )}
              />
              <div style={{ marginTop: '8px', padding: '0px 4px 0px 16px', height: '18px', lineHeight: '18px', textAlign: 'right' }}>
                <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
                <a href="javascript:void(0)">编辑</a>&nbsp;
                <a href="javascript:void(0)">删除</a> &nbsp;
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card bordered={false}>
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>品相列表</Breadcrumb.Item>
                  <Breadcrumb.Item>水光针</Breadcrumb.Item>
                  <Button size="small" style={{ float: 'right' }} type="primary">新建品项</Button>
                </Breadcrumb>
                <hr />
                <QueryForm />
                <SerachResult />
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
};
