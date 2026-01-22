interface IButtonProps {
    onClick?: () => void; 
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    id?: string;
    name?: string;
    disabled?: boolean;
}

const Button = ({id, name, type, onClick, className, children, disabled}: IButtonProps) => {
    return (
        <button disabled={disabled} id={id} name={name} type={type} onClick={onClick} className={`px-12 py-2  ${className}`}>
            {children}
        </button>
    )
}

export default Button;