import { Bell, MessageSquare, ChevronDown, Menu } from "lucide-react"
import { useUser } from "../context/UserContext"
import { useState } from "react"
import styled from "styled-components"

const HeaderWrapper = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  color: #4b5563;
  &:hover {
    color: #111827;
  }
`

const Title = styled.div`
  color: #064e3b;
  font-weight: bold;
  font-size: 1.125rem;
`

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const UserAvatar = styled.div`
  background-color: #065f46;
  color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = ({ title, toggleSidebar }) => {
  const { user, logout } = useUser()
  const [showDropdown, setShowDropdown] = useState(false)

  const formattedRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User"

  return (
    <HeaderWrapper>
      <div className="flex items-center gap-4">
        <Button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} />
        </Button>
        <Title>CREDIT APP</Title>
      </div>

      <div className="flex items-center gap-4">
        <Button>
          <Bell size={20} />
        </Button>
        <Button>
          <MessageSquare size={20} />
        </Button>

        <div className="relative">
          <Button
            className="flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserAvatar>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </UserAvatar>
            <span>{formattedRole}</span>
            <ChevronDown size={16} />
          </Button>

          {showDropdown && (
            <Dropdown>
              <div className="py-1">
                <button
                  onClick={() => {
                    logout()
                    window.location.href = "/login"
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}

export default Header
