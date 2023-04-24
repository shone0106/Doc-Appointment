import { Button, Nav, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const SideBar = () => {
  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333" className='vh-100' breakpoint={800} minWidth='50px' maxWidth='200px' toggled={false}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>DOC</CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="fa fa-home">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="fa fa-list">
            <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="fa fa-user">
            <Nav.Link as={Link} to="/profile">Profile </Nav.Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{ padding: '20px 5px' }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  )
};

export default SideBar;