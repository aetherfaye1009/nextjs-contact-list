// components/Pagination.jsx
import { text } from "@/styles/typography";
import { useMemo } from "react";

/**
 * Pagination Component
 * 
 * Behaviours:
 * - Shows up to 8 page numbers at a time
 * - Disables Previous on first page
 * - Disables Next on last page
 *
 * @param {Object} props
 * @param {Object} props.pagination - Pagination metadata
 * @param {number} [props.pagination.page=1] - Current page
 * @param {number} [props.pagination.count=0] - Item count in current page
 * @param {number} [props.pagination.totalPages=1] - Total available pages
 * @param {number} [props.pagination.totalCount=0] - Total items across all pages
 * @param {Function} [props.onPageChange] - Called when page changes
 */

export default function Pagination({
    onPageChange = () => { },
    pagination,
}) {
    const { page = 1, count = 0, totalPages = 1, totalCount = 0 } = pagination;

    const perPage = 20;

    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, count);

    const MAX_PAGES = 8;

    const pages = useMemo(() => {
        const half = Math.floor(MAX_PAGES / 2);

        let start = Math.max(1, page - half);
        let end = start + MAX_PAGES - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - MAX_PAGES + 1);
        }

        return Array.from(
            { length: end - start + 1 },
            (_, i) => start + i
        );
    }, [page, totalPages]);


    return (
        <div className="border-t p-2 flex gap-2 items-center justify-between bg-white flex-col sm:flex-row ">
            <span className={`${text.body}`}>
                {`${start}–${end} of ${totalCount} items`}
            </span>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(page - 1, "page")}
                    disabled={page <= 1}
                    className={`
                        ${text.body}
                          w-8 h-8 flex items-center justify-center 
                          rounded-md border border-gray-200
                          disabled:opacity-40 hover:bg-gray-100
                        `}
                >
                    {"<"}
                </button>

                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p, "page")}
                        className={`
                            ${text.body}
                                w-8 h-8 flex items-center justify-center rounded-md border
                                ${p === page
                                ? `bg-primary-500 text-white border-primary-500`
                                : `bg-white text-gray-700 border-gray-200 hover:bg-gray-100`
                            }
                        `}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(page + 1, "page")}
                    disabled={page >= totalPages}
                    className={` 
                        ${text.body}
                        w-8 h-8 flex items-center justify-center 
                        rounded-md border border-gray-200
                        disabled:opacity-40 hover:bg-gray-100`
                    }
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
