import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import AdminSider from '../../Components/Admin/common/AdminSider';
import AdminHeader from '../../Components/Admin/common/AdminHeader';
import AdminFooter from '../../Components/Admin/common/AdminFooter';
import HomeContent from '../../Components/Admin/AdminHome/HomeContent';
const { Content } = Layout;

class AdminHome extends Component {

  render() {
    return (
      <>
      <Layout style={{ minHeight: '100vh' }}> 
      <AdminSider />
      <Layout style={{ textAlign: "left",padding: 0}}>
          <AdminHeader />
          <Content style={{ margin: '0 16px' }}>

            {/* 面包屑导航 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>登录</Breadcrumb.Item>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            </Breadcrumb>
            
            {/* 内容区域 */}
            <HomeContent />
         
          </Content>
          <AdminFooter/>
        </Layout>
      </Layout>
      </>
    );
  }
}
export default AdminHome;


