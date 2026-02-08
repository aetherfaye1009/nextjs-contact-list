"use client";

import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import { profileHeaders } from "@/constants/tableHeaders";
import EpisodeList from "./EpisodeList";

/**
 * ProfileMain
 * 
 * Main container for the individual contact (profile) page.
 *
 * Behaviours:
 * - Receives normalized contact data
 * - Control three child components:
 *   - ProfileHeader → image + name
 *   - ProfileInfo → basic character details
 *   - EpisodeList → list of related episodes
 *
 * @param {Object} props
 * @param {Object} props.data
 * @param {string} [props.data.name]
 * @param {string} [props.data.status]
 * @param {string} [props.data.gender]
 * @param {string} [props.data.species]
 * @param {string} [props.data.location]
 * @param {string} [props.data.origin]
 * @param {string} [props.data.image]
 * @param {Array}  [props.data.episodes]
 */
export default function ProfileMain({ data }) {

    const { name = "", status = "", gender = "", species = "", location = {}, origin = {}, image = "", episodes = [] } = data;

    return (
        <div className="flex flex-col gap-2 p-8">
            <ProfileHeader image={image} name={name} />
            <ProfileInfo
                status={status}
                gender={gender}
                species={species}
                location={location}
                origin={origin}
            />
            <EpisodeList
                profileHeaders={profileHeaders}
                episodes={episodes}
            />
        </div>
    );
}
