import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {WithFalse} from "@ant-design/pro-layout/es/typing";
import {Tooltip} from "antd";

const Footer: React.FC = () => {
  let currentYear = new Date().getFullYear();
  let defaultMessage = 'skye';
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={<>
        {`${currentYear} ${defaultMessage}`}
      </> as WithFalse<any>}
      links={[
        {
          key: 'github',
          title: (
            <Tooltip title="项目开源地址">
              <GithubOutlined /> Github
            </Tooltip>

          ),
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
