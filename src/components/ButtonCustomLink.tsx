interface IButtonLinkProps {
    href?: string; 
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    id?: string;
}

const ButtonCustomLink = ({id, type, href, className, children}: IButtonLinkProps) => {
    return (
        <a id={id} type={type} href={href} className={`${className}`}>
            {children}
        </a>
    )
}

export default ButtonCustomLink;