import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices } = this.props;
    if (notices == null || notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {/* {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]} */}
        {/* <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        /> */}
        <div className={styles.right}>
          <Menu
            // onClick={this.handleClick}
            selectedKeys={['appstore']}
            mode="horizontal"
            style={{ backgroundColor: '#292929', color: '#FFF' }}
          >
            <Menu.Item key="home" style={{ textAlign: 'center' }}>
              <Icon type="home" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>首页</div>
            </Menu.Item>
            <Menu.Item key="appstore">
              <Icon type="appstore" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>品项</div>
            </Menu.Item>
            <Menu.Item key="user">
              <Icon type="user" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>会员</div>
            </Menu.Item>
            <Menu.Item key="gift">
              <Icon type="gift" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>营销</div>
            </Menu.Item>
            <Menu.Item key="area-chart">
              <Icon type="area-chart" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>报表</div>
            </Menu.Item>
            <Menu.Item key="idcard">
              <Icon type="idcard" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>员工</div>
            </Menu.Item>
            <Menu.Item key="rocket">
              <Icon type="rocket" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>人效</div>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" style={{ marginLeft: '10px' }} />
              <div style={{ height: '16px', lineHeight: '0', fontSize: '14px' }}>设置</div>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
