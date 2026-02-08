import { fetchContactsFromAPI, fetchMultipleEpisodesFromAPI, fetchSingleContactFromAPI } from "@/services/contactService";
import moment from "moment";

/**
 * This file sits between : 
 * - Services/contactService.js (raw API data)
 * - React server components
 * - Used to call service functions
 * - Normalize or transform data
 * - Remove unnecessary fields
 */

/**
 * Get and normalize a list of contacts for UI purpose.
 *
 * @param {Object} params - filters (name, page, status, species, gender)
 * @returns {Promise<{ pagination: Object, contacts: Array }>}
 */
export async function getContacts(params = {}) {
  const data = await fetchContactsFromAPI(params);

  const info = data.info;
  const results = data.results;

  const contacts = results.map((c) => ({
    image: c.image,
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
  }));

  const pagination = {
    totalPages: info.pages,
    totalCount: info.count,
  };

  return { pagination, contacts };
}

/**
 * Get and normalize a single contact for profile page.
 *
 * Behaviours:
 * - Returns {} if no ID is provided
 * - Returns {} if character is not found (404)
 * - Fetches related episodes and formats them
 * - Normalizes nested fields (location, origin)
 * - Formats episode air_date using moment
 *
 * @param {number|string} id - Character ID
 * @returns {Promise<Object>} Normalized contact object
 */
export async function getSingleContact(id) {

  if (!id) return {};

  const profileData = await fetchSingleContactFromAPI(id);

  if(!profileData){
    return {};
  }

  const { name = "", status = "", gender = "", location = {}, origin = {}, species = "", image = "", episode = [] } = profileData;

  const episodeIds = episode.map(ep => ep.replace("https://rickandmortyapi.com/api/episode/", ""));
  const episodes = episodeIds.length === 0 ? [] : await fetchMultipleEpisodesFromAPI(episodeIds);

  if(!episodes){
    return {}
  }
  
  const normalizedEpisode = Array.isArray(episodes) ? episodes.map(ep => {
    return {
      name: ep.name,
      air_date: moment(ep.air_date).format("YYYY-MM-DD"),
      episode: ep.episode,
    }
  }) : [{
    name: episodes.name,
    air_date: moment(episodes.air_date).format("YYYY-MM-DD"),
    episode: episodes.episode,
  }];

  const normalizedLocation = location?.name || "";
  const normalizedOrigin = origin?.name || "";
  const normalizedContact = {
    name,
    status,
    gender,
    species,
    image,
    location: normalizedLocation,
    origin: normalizedOrigin,
    episodes: normalizedEpisode
  };

  return normalizedContact;
}
