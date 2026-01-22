import type React from "react";

interface IInpputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type: "email" | "text" | "password" | "tel";
    id?: string;
    name?: string;
    placeholder: string;
    value?: string;
}

const Input = ({ id, name, placeholder, type, value, className, onChange }: IInpputProps) => {
    return (
        <input
            id={id}
            name={name}
            value={value}
            type={type}
            className={`border border-gray-400 w-full rounded-xl px-3 py-3 ${className}`}
            onChange={onChange}
            placeholder={placeholder} />
    )
}

export default Input;