import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils';
import bgImage from '../assets/login-bg.jpg';
import qrcode from '../assets/qrcode.png';

// const copyright = (
//   <Fragment>
//     Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
//   </Fragment>
// );

function getLoginPathWithRedirectPath() {
  const params = getPageQuery();
  const { redirect } = params;
  return getQueryPath('/user/login', {
    redirect,
  });
}

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '自然域科技';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 自然域科技`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    console.log(routerData, match);
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container} style={{ backgroundImage: `url(${bgImage})` }}>
          <div className={styles['desc-left']} />
          <div className={styles.desc}>
            <div className={styles.qrcode}>
              扫一扫，关注官方微信
              <img src={qrcode} style={{ width: '100%' }} />
            </div>
            <div className={styles.qrlabel}>
              <div
                style={{ marginTop: '24px', color: '#FFF', fontSize: '33px', lineHeight: '44px', fontWeight: 'bold' }}
              >
                智能管理业务系统
              </div>
              <div style={{ color: '#FFF', fontSize: '22px', lineHeight: '44px' }}>
                让每一笔财富看得见
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <span className={styles.title}>登录</span>
              </div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect from="/user" to={getLoginPathWithRedirectPath()} />
            </Switch>
          </div>
          <div className={styles['content-right']} />
          {/* <GlobalFooter links={links} copyright={copyright} /> */}
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
