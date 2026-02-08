# Contact List (Rick and Morty)

A Next.js application that displays a list of contacts (characters) from the **Rick and Morty API**, with search, filters, pagination, and individual profile pages.

---

## 🚀 Features

- 🔍 Search by name and species  
- 🎯 Filter by gender and status  
- 📄 Server-side data fetching for initial load  
- 🔄 Client-side filtering with debounce  
- 📑 URL-synced filters (`?name=&status=&page=`)  
- 📊 Pagination with numbered pages  
- 👤 Individual profile page per contact  
- 🎬 Episode list per character  
- ♻️ Reusable components (DataTable, SearchField, DropdownField, Pagination)

---

## 📂 Project Structure

```bash
/app
  /contact
    page.js                     # Contacts list page (Server Component)

    /components
      ContactMain.js
      ContactToolbar.js  

    /[id]
      page.js                   # Individual contact page (Server Component)

      /components
        EpisodeList.js
        ProfileHeader.js
        ProfileInfo.js
        ProfileMain.js

/components
  /Input
    SearchField.js
    DropdownField.js

  /DataTable
    DataTable.js
    Pagination.js

/constants
  dropdownOptions.js
  tableHeaders.js

/lib
  contact.js                    # Utility functions related to contacts

/services
  contactService.js             # API layer (Rick and Morty API)

/styles
  typography.js
```
---

## 🧠 Architecture (How Data Flows)

### 1. API Layer (`/services/contactService.js`)
Responsible for:
- Calling Rick and Morty API  
- Handling fetch errors  
- Returning raw API data  

Functions:
- `fetchContactsFromAPI`
- `fetchSingleContactFromAPI`
- `fetchMultipleEpisodesFromAPI`

---

### 2. Normalizer Layer (`/lib/contact.js`)
Responsible for:
- Transforming raw API data into UI-friendly format  
- Formatting dates with `moment`  
- Flattening nested objects  
- Preparing pagination metadata  

Functions:
- `getContacts`
- `getSingleContact`

---

### 3. UI Layer (React Components)

#### Contacts List Page
- `ContactMain` (client component)
  - Manages search & filter state  
  - Syncs filters with URL  
  - Debounces API calls  
  - Renders:
    - `ContactToolbar`
    - `DataTable`

#### Individual Profile Page
- `ProfileMain` (client component)
  - Renders:
    - `ProfileHeader`
    - `ProfileInfo`
    - `EpisodeList` (uses `DataTable`)


---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React (Functional Components)**
- **Tailwind CSS**
- **Lodash (debounce)**
- **Moment.js**
- **Rick and Morty API**

---

## ▶️ Running the Project

```bash
npm install
npm run dev
```
- Then open : http://localhost:3000/contact


## 🤖 AI Usage & My Contributions

### ✅ Parts primarily written / designed by me

The following parts of the project were designed and implemented by me:

- **Client-side folder structure (App Router)**  
  I structured the components into logical folders (`Input`, `DataTable`, `Profile`, etc.) based on responsibility and reuse.

- **UI / UX Implementation**  
  I designed and implemented the layout and visual structure using Tailwind CSS, including:
  - Contacts list page layout  
  - Profile page layout (Header, Info, Episodes section)  
  - Responsive design using Tailwind utility classes  

- **API Layer & Data Normalization (`/services` and `/lib/contact.js`)**  
  I implemented:
  - All API calls to the Rick and Morty API  
  - Error handling for 404 and failed requests  
  - Data transformation and normalization for:
    - Contact list  
    - Individual contact profile  
    - Episode data  
  - Flattening nested data (e.g., `location.name`, `origin.name`)  
  - Preparing pagination metadata for the UI  

- **Reusable Components (Core Implementation)**
  I built the following reusable components from scratch:
  - `DataTable` (table rendering, dynamic headers, clickable rows)  
  - `SearchField` (controlled input with icon)  
  - `DropdownField` (controlled select input)  
  - Basic pagination UI structure (without the sliding 8-page window logic)

- **Contacts List Functionality**
  I implemented:
  - Search & filter state management  
  - URL syncing of filters  
  - Row navigation to individual profile pages  

- **Profile Page Functionality**
  I implemented:
  - `ProfileMain` layout composition  
  - Passing normalized data into `ProfileHeader`, `ProfileInfo`, and `EpisodeList`  

---

### ✅ Parts heavily AI-generated and then edited / validated by me

I used AI as a learning assistant and productivity tool for the following areas. I reviewed, tested, and adapted all outputs before integrating them:

1. **Tailwind CSS equivalents to normal CSS**  
   - I asked AI for Tailwind equivalents (e.g., `display: flex -> flex`) while also referring to official documentation.  
   - I used this as a learning reference while developing.  
   - Example: I learned that `truncate` represents multiple CSS rules (`overflow-hidden`, `text-ellipsis`, `whitespace-nowrap`) and validated this behavior in my UI.

2. **Understanding App Router folder structure & data flow**  
   - Coming from Page Router (with Redux Saga/Toolkit), I asked AI about:
   - Typical App Router structure  
   - Recommended data-fetching patterns  
   - Whether Redux Saga/Toolkit is still necessary with Server Components  
   - I used this guidance as a reference to help structure my app, but adapted the approach to fit my specific requirements, relying more on Server Components and data fetching where appropriate..

3. **Improving filter persistence using URLSearchParams in App Router**  
   - I was originally saving filters and search states using localStorage / sessionStorage in Page Router.
   - However, this approach didn’t work well in App Router because Server Components cannot access browser storage.
   - AI suggested using URLSearchParams to store filters in the URL instead. Initially, I was hesitant because it produced encoded query strings that were hard to read and maintain.
   - I then refined the implementation by structuring the parameters more clearly using URLSearchParams.set(), making the URL more readable, predictable, and easier to debug and maintain.

4. **Debounce implementation**  
   - I had used debounce before but forgot the exact syntax and best practice.  
   - I asked AI for a simple, practical example using `lodash.debounce`.  
   - I adapted this pattern into my `ContactMain` component and change it into my likings to ensure filters update correctly.

5. **Pagination calculation (sliding 8-page window)**  
   - I first implemented basic pagination logic myself.
   - I then consulted AI to help refine a useMemo-based formula that dynamically calculates a sliding window of maximum 8 visible page buttons, centered around the current page where possible.
   - I reviewed the logic, adapted it to fit our UI requirements, and thoroughly tested it in the Pagination component to ensure edge cases (first/last page, small total pages) were handled correctly.

6. **Redirecting home page to `/contact`**  
   - I initially found recommendations online suggesting a forced redirect via next.config.js.
   - I felt this approach wasn’t ideal for maintainability and flexibility, so I consulted AI to explore alternative solutions.
   - I compared the AI’s suggestions with external sources and my own understanding of Next.js routing, and then made a final, informed decision before implementing the chosen approach.

7. **SEO Metadata for dynamic profile pages**  
   - I followed Next.js official documentation to implement `metadata`.  
   - I was concerned about potentially fetching the same API twice (once for metadata, once for the page).  
   - AI explained how App Router fetch deduplication with `cache: "force-cache"` works.  
   - I verified this behavior with the official Next.js documentation before applying it.

8. **Code Documentation (JSDoc & component comments)**  
   - I frequently asked AI to help generate clear, readable documentation blocks based on my function descriptions and parameters.  
   - I reviewed and adjusted these comments to ensure they accurately reflected my implementation.

---

### ⚠️ AI output I rejected or heavily rewrote (and why)

- **Forcing redirects via `next.config.js`**  
  I rejected solutions that required global forced routing in `next.config.js` because I felt it was too heavy-handed and less maintainable. I preferred a cleaner, app-level solution instead.

- **Overly complex state management suggestions (Redux everywhere)**  
  Some AI suggestions leaned toward using Redux extensively. I rejected this because App Router + Server Components made most global state unnecessary for this project.

---

### 💡 Final Reflection

Using AI helped me:
- Learn App Router & Tailwind CSS concepts faster  
- Improve code quality and structure  
- Write clearer documentation  
- Avoid common pitfalls (e.g., bad URL handling, unnecessary state management)

However, all architectural decisions, UI design, and core implementation remained my responsibility, and I validated all AI-assisted solutions through testing and external research.
