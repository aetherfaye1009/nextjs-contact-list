"use client";

import DataTable from "@/components/DataTable/DataTable";
import ContactToolbar from "./ContactToolbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getContacts } from "@/lib/contact";
import { debounce } from "lodash";
import { contactHeaders } from "@/constants/tableHeaders";
import { text } from "@/styles/typography";

/**
 * ContactMain
 * 
 * Main interactive container for the Contacts page.
 *
 * Behaviours:
 * - Manages search & filter state (searchFilters)
 * - Keeps UI state in sync with URL query params
 * - Debounces filter changes before fetching
 * - Calls getContacts to fetch filtered data
 * - Controls DataTable + ContactToolbar
 * - Handles navigation to individual contact profile
 *
 * @param {Object} props
 * @param {Object} [props.pagination] - Initial pagination from server
 * @param {number} [props.pagination.totalPages=1]
 * @param {number} [props.pagination.totalCount=0]
 *
 * @param {Array<Object>} [props.data] - Initial contact list from server
 */
export default function ContactMain({ pagination: initialPagination = { totalPages: 1, totalCount: 0 }, data = [] }) {

    const router = useRouter();
    const [searchFilters, setSearchFilters] = useState({
        name: "",
        species: "",
        status: "",
        gender: "",
        page: 1,
    });
    const [contactData, setContactData] = useState(data);
    const [pagination, setPagination] = useState({
        totalPages: initialPagination.totalPages,
        totalCount: initialPagination.totalCount,
        count: data.length
    });

    async function runFilter(filters) {
        const { pagination, contacts } = await getContacts(filters);
        setContactData(contacts);
        setPagination({
            totalCount: pagination.totalCount,
            totalPages: pagination.totalPages,
            count: contacts.length
        });
    }

    const debouncedFilterRef = useRef(
        debounce(async (filters) => {
            sessionStorage.setItem("searchFilters", JSON.stringify(filters));
            const params = new URLSearchParams(window.location.search);
            params.set("name", filters.name || "");
            params.set("species", filters.species || "");
            params.set("status", filters.status || "");
            params.set("gender", filters.gender || "");
            params.set("page", filters.page);

            router.replace(`?${params.toString()}`);

            await runFilter(filters);
        }, 500)
    );

    useEffect(() => {
        if (!searchFilters) return;

        debouncedFilterRef.current(searchFilters);

    }, [searchFilters]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setSearchFilters({
            name: params.get("name") || "",
            species: params.get("species") || "",
            status: params.get("status") || "",
            gender: params.get("gender") || "",
            page: Number(params.get("page") || 1),
        });
    }, []);

    function handleRowClick(id) {
        router.push(`/contact/${id}`)
    }

    function handleInputChange(value, type) {

        if (!type) return;

        setSearchFilters(prev => {
            return {
                ...prev,
                [type]: value
            }
        })
    }

    return (
        <div className="p-8">
            <h1 className={`${text.h1}`}>Contacts</h1>
            <ContactToolbar
                data={contactData}
                searchFilters={searchFilters}
                handleInputChange={handleInputChange}
            />
            <DataTable
                data={contactData}
                headers={contactHeaders}
                hasRowClick={true}
                onRowClick={handleRowClick}
                hasPagination={true}
                pagination={{
                    ...pagination,
                    page: searchFilters.page
                }}
                onPageChange={handleInputChange}
            />

        </div>
    );
}
