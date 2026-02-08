import { text } from "@/styles/typography";
import Image from "next/image";

/**
 * ProfileHeader
 * 
 * Displays the top section of a contact profile, including:
 * - Circular profile image
 * - Contact name as a page heading
 *
 * @param {Object} props
 * @param {string} [props.name] - Contact’s display name
 * @param {string} [props.image] - URL of the profile image
 */
export default function ProfileHeader({ name = "", image = "" }) {

    return (
        <div className="flex gap-8 p-4">
            <Image
                src={image}
                alt={`${name}'s profile.`}
                width={125}
                height={125}
                priority={true}
                className="rounded-full"
            />
            <h1 className={`${text.h1} flex items-center`}>{name}</h1>
        </div>
    );
}
