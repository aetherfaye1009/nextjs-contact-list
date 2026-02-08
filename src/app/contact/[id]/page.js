import { getSingleContact } from "@/lib/contact"
import ProfileMain from "./components/ProfileMain";


export async function generateMetadata({ params }) {
    const { id } = await params;

    const contact = await getSingleContact(id);

    return {
        title: `${contact.name} | SleekFlow`,
        description: `View information about ${contact.name}`,
    };
}

/**
 * Contact Profile Page (Individual Contact Page)
 * 
 * Responsibilities:
 * - Receives dynamic route param `id`
 * - Fetches a single contact via getSingleContact
 * - Passes normalized data to ProfileMain component
 *
 * This is a server component.
 */
export default async function ContactProfile({ params }) {

    const { id } = await params;

    const contact = await getSingleContact(id);

    return <ProfileMain data={contact} />;
}