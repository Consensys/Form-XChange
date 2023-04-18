import * as React from "react"
import type { SVGProps } from "react"

const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M5 0v1H0v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3h1V1h-5V0H5ZM3 3h10v13H3V3Zm2 2v9h2V5H5Zm4 0v9h2V5H9Z"
    />
  </svg>
)
export default TrashIcon