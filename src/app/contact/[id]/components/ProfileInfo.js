import { text } from "@/styles/typography";

/**
 * ProfileInfo
 * 
 * Displays basic personal information for a contact.
 *
 * @param {Object} props
 * @param {string} [props.status] - Character status (e.g. Alive, Dead, Unknown)
 * @param {string} [props.species] - Character species
 * @param {string} [props.gender] - Character gender
 * @param {string} [props.location] - Current location name
 * @param {string} [props.origin] - Origin location name
 */
export default function ProfileInfo({ status = "", species = "", gender = "", location = "", origin = "" }) {

    const detailsContainerClass = "flex flex-col sm:flex-row sm:items-center";
    const labelClass = `${text.bodyBold} sm:w-20`;
    const spanClass = `${text.body}`;

    return (

        <div className="p-2">
            <h2 className={`${text.h2} mb-3`}>Personal Info</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                <div className={detailsContainerClass}>
                    <span className={labelClass}>Status:</span>
                    <span className={spanClass}>{status}</span>
                </div>

                <div className={detailsContainerClass}>
                    <span className={labelClass}>Origin:</span>
                    <span className={spanClass}>{origin}</span>
                </div>

                <div className={detailsContainerClass}>
                    <span className={labelClass}>Gender:</span>
                    <span className={spanClass}>{gender}</span>
                </div>

                <div className={detailsContainerClass}>
                    <span className={labelClass}>Species:</span>
                    <span className={spanClass}>{species}</span>
                </div>

                <div className="flex sm:col-span-2">
                    <span className={labelClass}>Location:</span>
                    <span className={spanClass}>{location}</span>
                </div>
            </div>
        </div>
    );
}
