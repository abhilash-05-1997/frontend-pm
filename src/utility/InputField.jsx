const InputField = ({ label, type, id, className, ...props }) => (
    <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        {type === "textarea" ? (
            <textarea
                id={id}
                className={`${className || "mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"}`}
                {...props}
            />
        ) : (
            <input
                id={id}
                type={type}
                className= "mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        )}
    </div>
);

export default InputField;