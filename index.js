// Import the apiUrl constant from the specified module
import { apiUrl } from "./utils/constants.js";

// DOM elements
const username = document.getElementById("username");
const profileContainer = document.getElementsByClassName(
  "profile-header-container"
)[0];
let totalRepo = 0;
let selectedValue = 10;
let currentPage = 1;

// Import all the required HTML elements
const getInfoBtn = document.getElementById("get_info_btn");
const searchContainer = document.getElementById("search_container");
const mainBodyContent = document.getElementsByClassName("main-body-content")[0];
const errorMessage = document.getElementsByClassName("error-message")[0];
const goBackToSearchBtn = document.getElementById("go_back_to_search_page_btn");
const dropDownBtn = document.querySelector(".dropdown-btn");
const dropDownMenu = document.querySelector(".dropdown-menu");
const dropdown = document.querySelector(".dropdown");
const repositoriesContainer = document.getElementsByClassName(
  "repositories-container"
)[0];

// Event listeners
dropDownBtn.addEventListener("mouseover", showDropdown);
dropDownMenu.addEventListener("mouseleave", hideDropdown);

dropDownMenu.addEventListener("click", function (e) {
  const target = e.target;
  // Check if the clicked element is a dropdown item
  if (target.classList.contains("dropdown-item")) {
    console.log(target.innerHTML);
    selectedValue = target.innerHTML;
    dropdown.querySelector(
      ".dropdown-btn"
    ).textContent = `Result per page: ${selectedValue}`;
    repositoriesContainer.innerHTML = ""; // Clear previous content
    getRepositories(selectedValue);
    dropDownMenu.style.display = "none";
  }
});

getInfoBtn.addEventListener("click", getUserInfo);

// Function to handle going back to search
const goBackToSearch = () => {
  mainBodyContent.className += " hide";
  searchContainer.classList.remove("hide");
  goBackToSearchBtn.className += " hide";
};

goBackToSearchBtn.addEventListener("click", goBackToSearch);

// Function to display user data in the profile container
const displayUserData = (data) => {
  profileContainer.classList.remove("hide");
  const profilePicture = document.getElementById("profile_photo");
  const userName = document.getElementById("user_name");
  const userBio = document.getElementById("user_bio");
  const userAdderess = document.getElementById("user_adderes");
  const userTwitterUrl = document.getElementById("user_twitter_url");
  const userGithub = document.getElementById("user_github");

  profilePicture.src = data?.avatar_url;
  userName.innerHTML = `Name : ${data?.name}`;
  userBio.innerHTML = `Bio : ${data?.bio}`;
  userAdderess.innerHTML = `Adderess :${data?.location}`;
  userTwitterUrl.innerHTML = `${data?.twitter_username}`;
  userGithub.href = data?.html_url;
  userGithub.innerHTML = data?.html_url;
};

// Function to get user information
async function getUserInfo() {
  try {
    const res = await fetch(`${apiUrl}${username.value}`);
    const json = await res.json();

    if (res.status === 403) {
      // Forbidden, handle accordingly
      errorMessage.textContent =
        "API request reached it's limit, please try again after an hour.";
      errorMessage.classList.remove("hide");
      return;
    }

    if (json.message === "Not Found") {
      errorMessage.textContent = "User not found.";
      errorMessage.classList.remove("hide");
      return;
    } else {
      errorMessage.classList.remove("hide");
      errorMessage.className += " hide";
      searchContainer.classList.remove("hide");
      searchContainer.className += " hide";
      goBackToSearchBtn.classList.remove("hide");
      mainBodyContent.classList.remove("hide");
      displayPagination();
    }

    totalRepo = json?.public_repos;
    displayUserData(json);

    getRepositories(selectedValue);
  } catch (error) {
    console.log(error);
  }
}

// Function to get repositories
const getRepositories = async (resultPerPage, currPage) => {
  repositoriesContainer.innerHTML = "";

  try {
    const res = await fetch(
      `${apiUrl}${username.value}/repos?per_page=${resultPerPage}&page=${currPage}`
    );

    if (res.status === 403) {
      // Forbidden, handle accordingly
      errorMessage.textContent =
        "API request forbidden. Check your access permissions.";
      errorMessage.classList.remove("hide");
      return;
    }

    console.log(resultPerPage);
    const repositories = await res.json();
    console.log(repositories);
    repositories.forEach(async (repo) => {
      const repoElement = document.createElement("div");
      repoElement.className += "repository";
      // Fetch languages using the languages_url
      const languagesRes = await fetch(repo.languages_url);
      const languagesData = await languagesRes.json();
      const languages = Object.keys(languagesData);
      repoElement.innerHTML = `
      <div>
      <h2>${repo.name}</h2>
      <p>${repo.description || "No description available"}</p>
      <ul class="techstack-container">
      
        ${languages
          .map((language) => `<li class="techstack">${language}</li>`)
          .join("")}
      </ul>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      <hr>
    </div>
        `;

      repositoriesContainer.appendChild(repoElement);
    });
  } catch (error) {
    console.log(error.message);
  }

  console.log(repositoriesContainer);
};

// Function to display pagination
function displayPagination(totalRepositories) {
  const paginationDiv = document.getElementById("pagination");

  paginationDiv.innerHTML = "";

  const previousButton = document.createElement("button");
  previousButton.textContent = "Previous";
  previousButton.addEventListener("click", previousPage);
  paginationDiv.appendChild(previousButton);

  const currentPageSpan = document.createElement("span");
  currentPageSpan.id = "currentPage";
  currentPageSpan.textContent = currentPage;
  paginationDiv.appendChild(currentPageSpan);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", nextPage);
  paginationDiv.appendChild(nextButton);
}

// Function to navigate to the previous page
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageNumber();
    getRepositories(selectedValue, currentPage);
  }
}

// Function to navigate to the next page
function nextPage() {
  const totalPages = totalRepo / selectedValue;

  if (currentPage < totalPages) {
    currentPage++;
    updatePageNumber();
    getRepositories(selectedValue, currentPage);
  }
}

// Function to update the displayed page number
function updatePageNumber() {
  document.getElementById("currentPage").textContent = currentPage;
}

// Function to show the dropdown menu
function showDropdown() {
  document.querySelector(".dropdown-menu").style.display = "block";
}

// Function to hide the dropdown menu
function hideDropdown() {
  document.querySelector(".dropdown-menu").style.display = "none";
}
