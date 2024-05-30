import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer,  message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost
} from '@/services/skyeApi-backend/interfaceInfoController';
import {SortOrder} from "antd/es/table/interface";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      // 如果调用成功会提示'创建成功'
      message.success('创建成功');
      // 创建成功就关闭这个模态框
      handleModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    //如果没有选中行，则直接返回
    if(!currentRow){
      return ;
    }

    const hide = message.loading('修改中');
    try {
      //把updateRule改为updateInterfaceInfoUsingPost
      await updateInterfaceInfoUsingPost({
        id:currentRow.id,
        ...fields,
      });
      hide();
      //成功
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      //失败
      message.error('操作失败，'+ error.message);
      return false;
    }
  };

  /**
   * @zh-CN 发布节点
   *
   * @param recode
   */
  const handleOnline = async (recode: API.IdRequest) => {
    //设置加载中的提示为 正在加载
    const hide = message.loading('正在发布');
    if (!recode) return true;
    try {
      await onlineInterfaceInfoUsingPost({
        //传递id参数
        id: recode.id
      });
      hide();
      //成功
      message.success('操作成功');
      //上线成功后自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      //失败
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * @zh-CN 下线节点
   *
   * @param recode
   */
  const handleOffline = async (recode: API.IdRequest) => {
    //设置加载中的提示为 正在下线
    const hide = message.loading('正在下线');
    if (!recode) return true;
    try {
      await offlineInterfaceInfoUsingPost({
        //传递id参数
        id: recode.id
      });
      hide();
      //成功
      message.success('操作成功');
      //上线成功后自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      //失败
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param recode
   */
  const handleRemove = async (recode: API.InterfaceInfo) => {
    //设置加载中的提示为 正在删除
    const hide = message.loading('正在删除');
    if (!recode) return true;
    try {
      await deleteInterfaceInfoUsingPost({
        //拿到id就可以删除数据
        id: recode.id
      });
      hide();
      //成功
      message.success('删除成功');
      //删除成功后自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      //失败
      message.error('删除失败，' + error.message);
      return false;
    }
  };




  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      //name对应后端的字段名
      dataIndex: 'name',
      // tip不用管，一个规则
      // tip: 'The rule name is the unique key',
      // 展示文本
      valueType: 'text',
    formItemProps:{
        rules:[{
          required: true,
          message: '请输入接口名称'
        }]
    }
    },
    {
      title: '描述',
      //description对应后端的字段名
      dataIndex: 'description',
      // 展示的文本为富文本编辑器
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      // 展示的文本为富文本编辑器
      valueType: 'text',
      formItemProps:{
        rules:[{
          required: true,
          message: '请输入请求方法'
        }]
      }
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps:{
        rules:[{
          required: true,
          message: '请输入url'
        }]
      }
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ?
        <a
          key='online'
          onClick={() => {
            handleOnline(record)

          }}
        >
          发布
        </a> : null,
        record.status === 1 ?
        <Button
          type="text"
          danger
          key='offline'
          onClick={() => {
            handleOffline(record)

          }}
        >
        下线
        </Button> : null,
        <Button
          type="text"
          danger
          key='config'
          onClick={() => {
            handleRemove(record)

          }}
        >
          删除
        </Button>
      ],
    },

  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        //这个请求会在1、打开页面，刚接在表格时，2、手动点击刷新按钮时，3、点击查询按钮时，被调用
        //好处：不必再反复绑定和编写事件处理程序
        //需要确定请求参数和request的请求参数一致，确定响应值与request的响应值匹配
        //request={listInterfaceInfoByPageUsingGet}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
          const res: any = await listInterfaceInfoByPageUsingGet({
            ...params
          })
          // 如果后端请求给你返回了接口信息
          if (res?.data) {
            // 返回一个包含数据、成功状态和总数的对象
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            // 如果数据不存在，返回一个空数组，失败状态和零总数
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}

        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        //需要传递columns
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        //要传递的信息改为visible
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      {/* 创建一个CreateModal组件，用于在点击新增按钮时弹出 */}
      <CreateModal
        columns={columns}
        // 当取消按钮被点击时,设置更新模态框为false以隐藏模态窗口
        onCancel={() => {
          handleModalOpen(false);
        }}
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={(values) => {
          handleAdd(values);
        }}
        // 根据更新窗口的值决定模态窗口是否显示
        visible={createModalOpen}
      />


    </PageContainer>
  );
};
export default TableList;
