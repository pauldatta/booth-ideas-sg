# Product Requirements Document: Gym Member Tracking App

## 1. Overview & Vision

*   **Concept:** A simple, single-page application to manage gym member information.
*   **Goal:** To allow gym staff to easily add, view, and manage a list of active members.
*   **Target Audience:** Small gym owners or front-desk staff.

## 2. Core Functionality & Features

- [ ] A form to input new member details (Name, Email, Membership Start Date).
- [ ] A "Add Member" button that adds the new member to a list.
- [ ] A display area (e.g., a table or a list) showing all current members with their details.
- [ ] A "Delete" button next to each member to remove them from the list.
- [ ] The member list should be clear, readable, and update in real-time as members are added or removed.

## 3. Technical Implementation Constraints

The AI developer MUST adhere to the following constraints to ensure the project is self-contained and suitable for static hosting:

*   **Technology Stack:** Use only vanilla HTML, CSS, and JavaScript. Do not use any frontend frameworks or libraries (like React, Vue, jQuery, etc.).
*   **File Structure:** The entire application must be contained within three separate files: `index.html`, `style.css`, and `script.js`.
*   **Self-Contained:** The `index.html` file must correctly link the other two files. No external dependencies (like CDNs) should be used.
*   **Styling:** All styling must be in the `style.css` file. The design should be clean, modern, and responsive.
*   **Functionality:** All interactive logic must be in the `script.js` file, which will directly manipulate the DOM.
*   **Completeness:** The code must be a fully functional prototype of the core features listed above.
