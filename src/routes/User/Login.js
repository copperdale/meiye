import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Alert, notification } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import { getToken } from '../../utils/authority';

const { Shop, UserName, Password, Submit, Captcha, Tab } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  verifyCode: login.verifyCode,
  verifyImage: login.verifyImage,
}))
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    if (getToken('token')) {
      props.dispatch(routerRedux.push('/home'));
    }
  }

  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
    this.props.dispatch({
      type: 'login/getVerifyCode',
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;

    // dispatch({
    //   type: 'login/login',
    //   payload: {
    //     ...values,
    //     type,
    //   },
    // });
    if (!err) {
      if (this.props.verifyCode !== values.verifyCode) {
        notification.error({
          message: '登录错误',
          description: '请输入正确的验证码',
        });
        dispatch({
          type: 'login/getVerifyCode',
        });
        return;
      }
      let dispatchType = 'login/login';
      if (this.state.type === 'brand') {
        dispatchType = 'login/loginBrand'
      }
      dispatch({
        type: dispatchType,
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props; // eslint-disable-line
    const { type, autoLogin } = this.state; // eslint-disable-line
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="登录商户">
            <Shop name="storeId" placeholder="请输入商户门店编号" style={{ marginTop: '16px' }} />
            <UserName name="userName" placeholder="请输入用户名" style={{ marginTop: '16px' }} />
            <Password name="password" placeholder="请输入密码" style={{ marginTop: '16px' }} />
            <Captcha
              name="verifyCode"
              placeholder="请输入验证码"
              verifyCode={this.props.verifyCode}
              verifyImage={this.props.verifyImage}
              dispatch={this.props.dispatch}
              style={{ marginTop: '16px' }}
            />
          </Tab>
          <Tab key="brand" tab="登录品牌">
            <Shop name="orgId" placeholder="请输入品牌编号" style={{ marginTop: '16px' }} />
            <UserName name="brandAccount" placeholder="请输入用户名" style={{ marginTop: '16px' }} />
            <Password name="brandPassword" placeholder="请输入密码" style={{ marginTop: '16px' }} />
            <Captcha
              name="verifyCode"
              placeholder="请输入验证码"
              verifyCode={this.props.verifyCode}
              verifyImage={this.props.verifyImage}
              dispatch={this.props.dispatch}
              style={{ marginTop: '16px' }}
            />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
          <Link className={styles.register} to="/user/register">
            
          </Link>
        </Login>
      </div>
    );
  }
}
