
/**
 * profileHeaders — used for the Episode table
 * contactHeaders — used for the Contacts table
 */

export const profileHeaders = [
    {
        label: "Name",
        value: "name",
        type: "text"
    },

    {
        label: "Air Date",
        value: "air_date",
        type: "date"
    },

    {
        label: "Episode",
        value: "episode",
        type: "text"
    },
]


/**
 * Each here object contains the following fields :
 * - label : display name shown in the table header
 * - value : key used to map to data in each row
 * - type  : determines how the cell should be rendered
 * 
 * Supported type values 
 * - text : general text
 * - status : status field, renders colored badge/chips
 * - avatar : name with profile picture
 */
export const contactHeaders = [
    {
        label: "Name",
        value: "name",
        type: "avatar"
    },
    {
        label: "Status",
        value: "status",
        type: "status"
    },
    {
        label: "Species",
        value: "species",
        type: "text"
    },
    {
        label: "Gender",
        value: "gender",
        type: "text"
    },
]