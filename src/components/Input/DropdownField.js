import { text } from "@/styles/typography";

/**
 * DropdownField Component
 *
 * A reusable dropdown field.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label displayed above the input
 * @param {string} [props.className] - Additional CSS classes for the input
 * @param {Array<{ label: string, value: string }>} [props.options] - List of options
 * @param {string} [props.value] - Current input value
 * @param {Function} [props.onChange] - Triggered when input changes
 */
export default function DropdownField({
    label = "",
    className = "",
    options = [],
    value = "",
    onChange = () => { }
}
) {
    return (
        <div className="flex flex-col">
            <span className={`mb-1 ${text.body}`}>{label}</span>
            <select
                className={`${text.body} border px-2 py-1 rounded ${className}`}
                value={value}
                onChange={onChange}
            >
                <option value="">All</option>
                {options.map((o, index) => {
                    const label = o.label;
                    const value = o.value;
                    return <option key={index} value={value}>{label}</option>
                })}
            </select>
        </div>
    )
}