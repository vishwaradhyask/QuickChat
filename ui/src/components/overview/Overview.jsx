import { useSelector } from "react-redux"

const Overview = () => {
  const states = useSelector((state) => state)
  console.log('state@home:', states)
  return (
    <div>
      home update
    </div>
  )
}

export default Overview