import React from "react"
import Button from "../Button/Button"
import NoResultSvg from "./no-result.svg"
import { ButtonWrapper, ImageWrapper, NoResultWrapper } from "./NoResult.style"
// import { ArrowPrev } from '../AllSvgIcon';

type NoResultProps = {
    id?: string
    onClick?: () => void
    hideButton?: boolean
    style?: any
}

const NoResult: React.FC<NoResultProps> = ({
    id,
    onClick,
    hideButton = true,
    style,
}) => {
    return (
        <NoResultWrapper id={id} style={style}>
            <h3>No data yet </h3>

            <ImageWrapper>
                <img src={NoResultSvg} alt="No Result" />
            </ImageWrapper>

            {!hideButton ? (
                <ButtonWrapper>
                    <div onClick={onClick}>
                        <Button>
                            {/* <ArrowPrev /> Go Back */}
                        </Button>
                    </div>
                </ButtonWrapper>
            ) : null}
        </NoResultWrapper>
    )
}

export default NoResult
