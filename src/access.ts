/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    //canAdmin: currentUser && currentUser.access === 'admin',
    //如果loginUser存在，并且用户角色为 'admin',说明该用户是管理员
    canUser : loginUser,
    canAdmin : loginUser?.userRole === 'admin',
    //该文件为Ant Design Pro内置的一套权限管理机制
    //获取全局初始化状态（InitialState）中的loginUser

  };
}
