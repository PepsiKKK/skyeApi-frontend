import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';


export const UserAddModalFormColumns: ProFormColumnsType<API.UserVO, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: "userAccount",
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户账号为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
          required: true
        })],
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '角色/权限',
    dataIndex: 'userRole',
    valueType: "radio",
    key: 'userRole',
    valueEnum: {
      "admin": {
        text: '管理员',
      },
      "user": {
        text: '普通用户',
      }
    }
  },
];
export const UserUpdateModalFormColumns: ProFormColumnsType<API.UserVO, "text">[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: "id"
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: "userName",
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: "gender",
    valueType: "radio",
    valueEnum: {
      "0": {
        text: '男',
      },
      "1": {
        text: '女',
      }
    },
    width: 'lg',
    colProps: {
      span: 24,
    },
  },
  {
    title: '角色/权限',
    dataIndex: 'userRole',
    valueType: "radio",
    key: 'userRole',
    valueEnum: {
      "admin": {
        text: '管理员',
      },
      "user": {
        text: '普通用户',
      }
    }
  },
  {
    title: '密码',
    key: "userPassword",
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value.length < 0) {
              return Promise.reject(new Error("用户密码为必填项"));
            }
            return Promise.resolve();
          },
        })],
    },
  },
];

// id  昵称username 账号userAccount 头像userAvatar 性别gender 权限角色userRole
// 密码userPassword accessKey secretKey createTime updateTime 状态isDelete

export const UserColumns: ProColumns<API.UserVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    copyable: true,
    ellipsis: true,
    key: 'userName',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    valueType: 'text',
    copyable: true,
    key: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    valueType: 'image',
    key: 'userAvatar',
    search: false
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    key: 'gender',
    valueEnum: {
      0: {
        text: '男',
      },
      1: {
        text: '女',
      }
    }
  },
  {
    title: 'SecretKey',
    dataIndex: 'secretKey',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'secretKey',
    search: false
  },
  {
    title: 'AccessKey',
    dataIndex: 'accessKey',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'accessKey',
    search: false
  },
  {
    title: '角色/权限',
    dataIndex: 'userRole',
    key: 'userRole',
    filters: true,
    onFilter: true,
    valueEnum: {
      "admin": {
        text: '管理员',
        status: 'success'
      },
      "user": {
        text: '普通用户',
        status: 'default'
      }
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    key: 'updateTime',
    search: false
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    key: 'createTime',
    search: false
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
    valueEnum: {
      0: {
        text: '启用',
        status: 'Default',
      },
      1: {
        text: '禁用',
        status: 'Processing',
      },
    },
  },
];

export default UserColumns;
