// services/contactServices.js

/**
 * This file contains all contact-related API calls.
 * 
 * Public Rick and Morty API is used:
 * https://rickandmortyapi.com/documentation
 * 
 * Responsibility of this file:
 * - Build query parameters
 * - Make fetch requests
 * - Handle basic API errors
 * - Return clean JSON data to the rest of the app
 */

/**
 * Fetch a list of contacts (characters) with optional filters.
 *
 * @param {Object} params - Query parameters for filtering and pagination purposes
 * @param {string} [params.name] - Filter by character name
 * @param {number} [params.page=1] - Page number for pagination
 * @param {string} [params.status] - Filter by status (alive, dead, unknown)
 * @param {string} [params.species] - Filter by species
 * @param {string} [params.gender] - Filter by gender (male, female, genderless, unknown)
 *
 * @returns {Promise<Object>} 
 * - If found: { info, results }
 * - If 404: { info: { pages: 0, count: 0 }, results: [] }
 * - Otherwise throws an error
 */
export async function fetchContactsFromAPI(params = {}) {
  const { name = "", page = 1, status = "", species = "", gender = "" } = params;

  const query = new URLSearchParams();

  if (name) query.append("name", name);
  if (species) query.append("species", species);
  if (status) query.append("status", status);
  if (gender) query.append("gender", gender);
  if (page) query.append("page", page);


  const res = await fetch(`https://rickandmortyapi.com/api/character?${query.toString()}`, { cache: "force-cache" });

  if (!res.ok) {
    if (res.status === 404) {
      return { info: { pages: 0, count: 0 }, results: [] };
    }
    throw new Error(`Failed to fetch contacts: ${res.status}`);

  }

  const data = await res.json();

  return data;
}

/**
 * Fetch a single contact (character) by ID.
 *
 * @param {number|string} id - Character ID
 * @returns {Promise<Object|null>}
 * - Returns character object if found
 * - Returns null if 404 (not found)
 * - Throws error for other failures
 */
export async function fetchSingleContactFromAPI(id) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, { cache: "force-cache" });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch contact: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

/**
 * Fetch multiple episodes by episode IDs.
 *
 * @param {Array<number|string>} episodes - Array of episode IDs
 * @returns {Promise<Object|Array|null>}
 * - Returns episode data if found
 * - Returns null if 404
 * - Throws error for other failures
 */
export async function fetchMultipleEpisodesFromAPI(episodes) {

  const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodes.toString()}`);

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch episodes: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
