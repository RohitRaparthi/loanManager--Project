// StatCard.jsx
import styled from "styled-components"

const Card = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  padding: 1rem;
  display: flex;
  align-items: start;
  gap: 1rem;
`

const IconBox = styled.div`
  background-color: ${props => props.bgColor || "#047857"};
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
`

const ValueText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const LabelText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
`

const StatCard = ({ icon, value, label, iconBgColor }) => {
  return (
    <Card>
      <IconBox bgColor={iconBgColor}>
        {icon}
      </IconBox>
      <div>
        <ValueText>{value}</ValueText>
        <LabelText>{label}</LabelText>
      </div>
    </Card>
  )
}

export default StatCard
