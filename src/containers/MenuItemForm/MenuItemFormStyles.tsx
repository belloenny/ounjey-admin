import { styled } from "baseui"

export const AddButton = styled("div", ({ $theme }) => ({
    backgroundColor: "rgba(238,238,238)",
    width: "150px",
    cursor: "pointer",
    color: "#000",
    display: "flex",
    alignItems: "center",
    minHeight: "32px",
    padding: "5px 8px",
    transition:
        "background-color 85ms ease-in, opacity 40ms ease-in, border-color 85ms ease-in",
    height: "fit-content",
    "&:hover": {
        color: "rgba(0, 0, 0, 0.24)",
    },
}))

export const MenuGrid = styled("div", ({ $theme }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "center",
    alignItems: "center",
}))

export const List = styled("div", ({ $theme }) => ({
    background: "#eeeee",
    flexShrink: "0",
    width: "272px",
    height: "fit-content",
    margin: "10px",

    border: "1px solid rgba(0, 0, 0, 0.12)",
}))

export const ListTitle = styled("div", ({ $theme }) => ({
    padding: "10px",
    overflowWrap: "break-word",
}))
export const Card = styled("div", ({ $theme }) => ({
    position: "relative",
    cursor: "pointer",
    background: "white",
    margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxShadow: "0 1px 0 rgba(9, 45, 66, 0.25)",
    fontSize: "15px",
    overflowWrap: "break-word",
    minHeight: "18px",
}))

export const ToggleAddCard = styled("div", ({ $theme }) => ({
    cursor: "pointer",
    padding: "10px",
    color: "#6b808c",
    display: "flex",
    alignItems: "center",
}))

export const MainWrapper = styled("div", ({ $theme }) => ({
    padding: "30px 10px",
}))
