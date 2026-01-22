interface ICheckboxProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    id: string;
    name?: string;
    label: string;
    checked?: boolean;
}

const Checkbox = ({ id, name, label, className, onChange, checked }: ICheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
            />
            <label htmlFor={id} className="text-sm font-medium text-gray-700 ml-2 cursor-pointer">
                {label}
            </label>
        </div>
    )
}

export default Checkbox;