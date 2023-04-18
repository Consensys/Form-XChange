import * as React from "react"
import { SVGProps } from "react"

const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M6 14V8H0V6h6V0h2v6h6v2H8v6H6Z" />
  </svg>
)
export default AddIcon