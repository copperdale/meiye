import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" style={{ fontSize: '1.2rem' }} className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Shop: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="shop" style={{ fontSize: '1.2rem' }} className={styles.prefixIcon} />,
      placeholder: 'Please enter shop!',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" style={{ fontSize: '1.2rem' }} className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
    ],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      // prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha',
      verifyImage: '',
      dispatch: () => { console.log('no dispatch'); },
    },
    rules: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
  },
};

export default map;
