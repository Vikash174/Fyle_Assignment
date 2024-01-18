# GitHub Repositories Viewer

## Project Overview

This project is a GitHub Repositories Viewer developed as part of an assignment for an internship at Fyle. The primary goal of this application is to allow users to explore GitHub repositories for a specific user, providing detailed information about the user and a paginated list of repositories. The project incorporates responsive design principles to ensure a seamless user experience across various devices.

## Features

### 1. User Information Display

Upon entering a GitHub username and clicking the "Get Info" button, the application fetches user data using the GitHub API. It displays essential information about the user, including the user's name, bio, address, Twitter handle, and a link to their GitHub profile.

### 2. Repositories Listing

The application retrieves and displays a list of repositories for the specified user. Each repository is presented with its name, description (if available), and a list of technologies used. Users can click on the "View on GitHub" link to open the repository in a new tab.

### 3. Customizable Result per Page

To enhance user control, the application features a dropdown menu that allows users to choose the number of repositories displayed per page. Users can select options ranging from 10 to 100 repositories.

### 4. Pagination

The repositories are paginated, providing navigation buttons for users to move between pages of repositories. This ensures a more organized and manageable display of repositories, especially for users with a large number of repositories.

## Project Progress

The project has been developed incrementally, following these key steps:

1. **Setup and Basic Structure:** Initialized the project, set up the HTML structure, and added the necessary CSS for styling.

2. **User Information Retrieval:** Implemented the functionality to fetch and display user information based on the entered GitHub username.

3. **Repositories Display:** Developed the logic to fetch and present repositories for the specified user. Each repository card includes information such as name, description, and the technologies used.

4. **Customizable Results:** Added the ability for users to customize the number of repositories displayed per page through a dropdown menu.

5. **Pagination:** Implemented pagination for a better user experience when navigating through multiple pages of repositories.

6. **Styling and Responsiveness:** Ensured a visually appealing layout and responsiveness to provide an optimal experience on various devices.

7. **Error Handling:** Incorporated error handling to display a user-friendly message in case of invalid usernames or API errors.

## Running Locally

To run the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Vikash174/Fyle_Assignment/your-repo.git
