import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import styled from "styled-components"

const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const TableHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
`

const LoanTable = ({ loans, role, onStatusChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const totalPages = Math.ceil(loans.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const visibleLoans = loans.slice(startIndex, startIndex + rowsPerPage)

  const renderActionButtons = (loan) => {
    if (role === "admin") {
      return (
        <div className="flex gap-2">
          {loan.status === "pending" && (
            <>
              <ActionButton
                onClick={() => onStatusChange?.(loan.id, "approved")}
                bgColor="#10B981"
              >
                APPROVE
              </ActionButton>
              <ActionButton
                onClick={() => onStatusChange?.(loan.id, "rejected")}
                bgColor="#EF4444"
              >
                REJECT
              </ActionButton>
            </>
          )}
        </div>
      )
    } else {
      return <span>{loan.status}</span>
    }
  }

  return (
    <TableWrapper>
      <TableHeader>
        <h3>Applied Loans</h3>
        <div className="flex items-center gap-2">
          <button>Sort</button>
          <button>Filter</button>
        </div>
      </TableHeader>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Loan Officer</th>
              <th>Amount</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.user.name}</td>
                <td>{loan.amount}</td>
                <td>{loan.date}</td>
                <td>{renderActionButtons(loan)}</td>
                <td>
                  <MoreVertical size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </TableWrapper>
  )
}

export default LoanTable
