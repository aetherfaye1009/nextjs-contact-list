import { text } from "@/styles/typography";
import Pagination from "./Pagination";
import Image from "next/image";

/**
 * DataTable Component
 * 
 * A reusable table component that:
 * - Renders dynamic columns based on headers
 * - Renders rows based on data array
 * - Supports clickable rows
 * - Optionally includes pagination
 *
 * Behaviours:
 * - Uses headers to determine both column labels and data keys
 * - Truncates long cell content with ellipsis
 * - Shows a "No data" message when data array is empty
 * - Makes entire row clickable (returns row id)
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional wrapper styles
 * @param {Array<{ label: string, value: string }>} [props.headers]
 *   - label: column display name
 *   - value: key used to read data from each row object
 * @param {Array<Object>} [props.data] - Table row data (each item should have an `id`)
 *  * @param {Function} [props.hasRowClick] - Whether to allow row click or show cursor pointer
 * @param {Function} [props.onRowClick] - Called with row id when a row is clicked
 * @param {boolean} [props.hasPagination] - Whether to show Pagination component
 * @param {Object} [props.pagination] - Pagination metadata (passed to Pagination)
 * @param {Function} [props.onPageChange] - Handler passed to Pagination
 */
export default function DataTable({
    className = "",
    headers = [],
    data = [],
    hasRowClick = false,
    onRowClick = () => { },
    hasPagination = false,
    pagination = { page: 1, count: 0, totalPages: 1, totalCount: 0 },
    onPageChange = () => { }
}) {

    function renderCell(row, header) {
        const value = row[header.value];

        switch (header.type) {
            case "avatar":
                return (
                    <div className="flex items-center gap-2">
                        <Image
                            src={row.image || ""}
                            alt={`${value}'s profile.`}
                            width={40}
                            height={40}
                            priority={true}
                            className="rounded-full object-cover"
                        />
                        <span className="truncate">{value}</span>
                    </div>
                );

            case "status":
                const chipsColor =
                    value === "Alive"
                        ? "bg-green-100 text-green-700"
                        : value === "Dead"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-200 text-gray-700"
                return (
                    <span
                        className={`px-2 py-1 rounded capitalize tracking-wide ${chipsColor}`}
                    >
                        {value}
                    </span>
                );

            default: // "text"/"date"
                return <span className="truncate capitalize">{value}</span>;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {data.length > 0}
            <div className={`h-[70vh] overflow-y-auto border border-gray-200 rounded-lg ${className}`}>
                <table className="w-full table-fixed">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            {headers.map((h, index) => (
                                <th
                                    key={index}
                                    className={`${text.tableBold} px-4 py-2 text-left border-b`}
                                >
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {data.length > 0 ?
                        <tbody>
                            {data.map((d, index) => (
                                <tr
                                    key={d.id || index}
                                    className={`border-b hover:bg-gray-50 ${hasRowClick ? 'cursor-pointer' : ""}`}
                                    onClick={() => onRowClick(d.id)}
                                >
                                    {headers.map((h, index) => {
                                        const header = h.value;

                                        return <td key={index} className={`${text.table} max-w-[200px] px-4 py-3 truncate`} title={d[header]}>{renderCell(d, h)}</td>
                                    })}
                                </tr>
                            ))}
                        </tbody>
                        : <span className="px-4">No data loaded. Please try again !</span>}
                </table>
            </div>
            {hasPagination ? <Pagination pagination={pagination} onPageChange={onPageChange} /> : null}
        </div>

    );
}
