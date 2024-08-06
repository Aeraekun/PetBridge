const StateBadge = ({state}) => {
  // Define a mapping of states to colors
  const stateColors = {
    입양중: "bg-cyan-100", // Light cyan
    입양대기: "bg-yellow-100", // Light yellow
    입양완료: "bg-green-100", // Light green
    임시보호: "bg-gray-100", // Light gray
  }

  // Get the color for the current state, default to gray if not found
  const color = stateColors[state] || "bg-gray-100"

  return (
    <div
      className={`flex h-8 items-center justify-center rounded border border-black ${color}`}
    >
      {state}
    </div>
  )
}

export default StateBadge
