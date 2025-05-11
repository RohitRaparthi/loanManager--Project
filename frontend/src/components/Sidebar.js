// Sidebar.jsx
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import {
  LayoutDashboard,
  Users,
  FileText,
  Repeat,
  Settings,
  PiggyBank,
  DollarSign,
  Calculator,
  BarChart,
  FileCheck,
  Calendar,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import styled from "styled-components"

const SidebarContainer = styled.div`
  background-color: #065f46;
  color: white;
  height: 100vh;
  width: ${props => (props.collapsed ? "4rem" : "16rem")};
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
`

const UserInfo = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const Avatar = styled.div`
  background-color: #047857;
  border-radius: 9999px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuList = styled.ul`
  padding: 0.5rem 0;
  flex: 1;
  overflow-y: auto;
`

const MenuItem = styled.li`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    text-align: left;

    &:hover {
      background-color: #047857;
    }
  }
`

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #047857;
  }
`

const Sidebar = ({ role }) => {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const adminMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "Borrowers", path: "/admin/borrowers" },
    { icon: <FileText size={20} />, label: "Loans", path: "/admin/loans" },
    { icon: <Repeat size={20} />, label: "Repayments", path: "/admin/repayments" },
    { icon: <Calculator size={20} />, label: "Loan Parameters", path: "/admin/loan-parameters" },
    { icon: <DollarSign size={20} />, label: "Accounting", path: "/admin/accounting" },
    { icon: <BarChart size={20} />, label: "Reports", path: "/admin/reports" },
    { icon: <FileCheck size={20} />, label: "Collateral", path: "/admin/collateral" },
    { icon: <Settings size={20} />, label: "Access Configuration", path: "/admin/access" },
    { icon: <PiggyBank size={20} />, label: "Savings", path: "/admin/savings" },
    { icon: <DollarSign size={20} />, label: "Other Incomes", path: "/admin/incomes" },
    { icon: <DollarSign size={20} />, label: "Payroll", path: "/admin/payroll" },
    { icon: <DollarSign size={20} />, label: "Expenses", path: "/admin/expenses" },
    { icon: <FileCheck size={20} />, label: "E-signatures", path: "/admin/signatures" },
    { icon: <DollarSign size={20} />, label: "Investor Accounts", path: "/admin/investor-accounts" },
    { icon: <Calendar size={20} />, label: "Calendar", path: "/admin/calendar" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
  ]

  const verifierMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/verifier/dashboard" },
    { icon: <Users size={20} />, label: "Borrowers", path: "/verifier/borrowers" },
    { icon: <FileText size={20} />, label: "Loans", path: "/verifier/loans" },
    { icon: <Repeat size={20} />, label: "Repayments", path: "/verifier/repayments" },
    { icon: <Calculator size={20} />, label: "Loan Parameters", path: "/verifier/loan-parameters" },
    { icon: <DollarSign size={20} />, label: "Accounting", path: "/verifier/accounting" },
    { icon: <BarChart size={20} />, label: "Reports", path: "/verifier/reports" },
    { icon: <FileCheck size={20} />, label: "Collateral", path: "/verifier/collateral" },
    { icon: <Settings size={20} />, label: "Access Configuration", path: "/verifier/access" },
    { icon: <PiggyBank size={20} />, label: "Savings", path: "/verifier/savings" },
    { icon: <DollarSign size={20} />, label: "Expenses", path: "/verifier/expenses" },
    { icon: <FileCheck size={20} />, label: "E-signatures", path: "/verifier/signatures" },
    { icon: <DollarSign size={20} />, label: "Investor Accounts", path: "/verifier/investor-accounts" },
    { icon: <Calendar size={20} />, label: "Calendar", path: "/verifier/calendar" },
    { icon: <Settings size={20} />, label: "Settings", path: "/verifier/settings" },
  ]

  const menuItems = role === "admin" ? adminMenuItems : verifierMenuItems

  return (
    <SidebarContainer collapsed={isCollapsed}>
      <UserInfo>
        <Avatar>
          <Users size={16} />
        </Avatar>
        {!isCollapsed && <div>{user?.name}</div>}
      </UserInfo>

      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <button onClick={() => navigate(item.path)}>
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          </MenuItem>
        ))}
      </MenuList>

      <div style={{ padding: "1rem" }}>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          {!isCollapsed && <span>Sign Out</span>}
        </LogoutButton>
      </div>
    </SidebarContainer>
  )
}

export default Sidebar
