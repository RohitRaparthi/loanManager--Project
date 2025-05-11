"use client"

import { createContext, useState, useContext } from "react"

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const isAuthenticated = !!user

  const login = async (email, password) => {
    let role = "user"

    if (email.includes("admin")) {
      role = "admin"
    } else if (email.includes("verifier")) {
      role = "verifier"
    }

    const user = {
      id: "123",
      name: email.split("@")[0],
      email,
      role,
    }

    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const register = async (name, email, password) => {
    const user = {
      id: "123",
      name,
      email,
      role: "user",
    }

    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
