export type AppProps = {
    isAuthenticated: boolean,
}

export type TextButtonProps = {
    text: string,
    icon?: JSX.Element,
    onClick: Function,
}

export type ButtonProps = {
    text: string,
    icon?: JSX.Element,
    onClick: Function,
    className: string, 
}
