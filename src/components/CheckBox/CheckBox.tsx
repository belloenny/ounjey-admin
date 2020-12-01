import { Checkbox as BaseCheckbox } from "baseui/checkbox"
import React from "react"
export { STYLE_TYPE } from "baseui/checkbox"

export const LABEL_PLACEMENT = Object.freeze({
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
})

const Checkbox = ({ ...props }) => {
    return <BaseCheckbox {...props} />
}

export default Checkbox
