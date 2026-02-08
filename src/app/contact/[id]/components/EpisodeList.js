import DataTable from "@/components/DataTable/DataTable";
import { text } from "@/styles/typography";

/**
 * EpisodeList
 * 
 * Displays a list of episodes related to the contact profile.
 *
 * @param {Object} props
 * @param {Array<{ label: string, value: string }>} [props.profileHeaders]
 *   - Column definitions passed to DataTable
 * @param {Array<Object>} [props.episodes]
 *   - Normalized episode data to display in the table
 */
export default function EpisodeList({ profileHeaders = [], episodes = [] }) {

    return (
        <div className="p-2">
            <h2 className={`${text.h2} mb-3`}>Episodes</h2>
            <DataTable
                headers={profileHeaders}
                data={episodes}
                className="!h-[50vh]"
            />
        </div>
    );
}
