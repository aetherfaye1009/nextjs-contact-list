import { getContacts } from "@/lib/contact";
import ContactMain from "./components/ContactMain";


export const metadata = {
    title: "Contact List - SleekFlow",
    description: "View our list of contacts with their related information.",
};

/**
 * Contacts page
 * - Fetches contacts and pass to ContactMain
 * - Renders the contacts table with search and filter
 * 
 * This is a server component.
 */
export default async function Contacts({ searchParams }) {
    const filters = {
        name: searchParams.name || "",
        species: searchParams.species || "",
        status: searchParams.status || "",
        gender: searchParams.gender || "",
        page: Number(searchParams.page || 1),
    };

    const { pagination, contacts } = await getContacts(filters);

    return <ContactMain pagination={pagination} data={contacts} />;
}
