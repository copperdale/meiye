import React from 'react';
import { Drawer } from 'antd';
import HeaderMenu from './HeaderMenu';

const HeaderMenuWrapper = props => {
  const { isMobile, collapsed } = props;
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      style={{
        padding: 0,
      }}
      onClose={() => {
        props.onCollapse(true);
      }}
    >
      <HeaderMenu {...props} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <HeaderMenu {...props} />
  );
};

export default HeaderMenuWrapper;
