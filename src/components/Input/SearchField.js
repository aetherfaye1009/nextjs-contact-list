
import { text } from "@/styles/typography";
import { FaSearch } from "react-icons/fa";

/**
 * SearchField Component
 *
 * A reusable search input field with a search icon.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label displayed above the input
 * @param {string} [props.className] - Additional CSS classes for the input
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Current input value
 * @param {Function} [props.onChange] - Triggered when input changes
 */
export default function SearchField({
    label = "",
    className = "",
    placeholder = "Search",
    value = "",
    onChange = () => { }
}) {
    return (
        <div className="flex flex-col">
            {label ? <span className={`mb-1 ${text.body}`}>{label}</span> : null}
            <div className="flex items-center gap-1 border px-2 py-1 rounded">
                <input
                    className={`${text.body}  ${className} w-full outline-none focus:outline-none focus:ring-0`}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <FaSearch className={`text-gray-500`} size={12}/>
            </div>

        </div>
    )
}