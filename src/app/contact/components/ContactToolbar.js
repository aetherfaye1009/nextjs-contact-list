import DropdownField from "@/components/Input/DropdownField";
import SearchField from "@/components/Input/SearchField";
import { genderOptions, statusOptions } from "@/constants/dropdownOptions";

/**
 * ContactToolbar Component
 * 
 * A toolbar for the contacts list page that contains:
 * - Search fields (Name, Species)
 * - Dropdown filters (Gender, Status)
 *
 * Behaviours:
 * - All inputs are controlled via `searchFilters`
 * - All changes are delegated to `handleInputChange`
 * - Each input updates a specific key in searchFilters
 *
 * @param {Object} props
 * @param {Object} [props.searchFilters] - Current filter state
 * @param {string} [props.searchFilters.name]
 * @param {string} [props.searchFilters.species]
 * @param {string} [props.searchFilters.status]
 * @param {string} [props.searchFilters.gender]
 * @param {number} [props.searchFilters.page]
 *
 * @param {Function} [props.handleInputChange]
 * - Called as handleInputChange(value, key)
 * - Example: handleInputChange("alive", "status")
 */
export default function ContactToolbar({
    searchFilters = {
        name: "",
        species: "",
        status: "",
        gender: "",
        page: 1,
    },
    handleInputChange = () => { },
}) {

    const { name = "", gender = "", status = "", species = "" } = searchFilters;

    function handleSearchInputChange(e) {
        handleInputChange(e.target.value, "name")
    }

    return (
        <div className="py-4 flex flex-col gap-2 sm:flex-row">
            <SearchField
                label="Name"
                placeholder="Search by name"
                value={name}
                onChange={handleSearchInputChange}
            />

            <DropdownField
                className="w-40"
                label="Status"
                options={statusOptions}
                value={status}
                onChange={(e) =>
                    handleInputChange(e.target.value, "status")
                }
            />

            <SearchField
                label="Species"
                placeholder="Search by species"
                value={species}
                onChange={(e) =>
                    handleInputChange(e.target.value, "species")
                }
            />

            <DropdownField
                className="w-40"
                label="Gender"
                options={genderOptions}
                value={gender}
                onChange={(e) =>
                    handleInputChange(e.target.value, "gender")
                }
            />



        </div>
    )
}