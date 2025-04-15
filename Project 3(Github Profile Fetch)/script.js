const baseUrl = 'https://api.github.com/users';
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("search-btn");
const profileContainerEl = document.querySelector(".profile-container");
const loadingEl = document.querySelector(".loading");

const generateprofile = (profile) => {
  return `
    <div class="profile-box">
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img src="${profile.avatar_url}" alt="Avatar">
          </div>
          <div class="self">
            <h1>${profile.name || "No Name"}</h1>
            <h1>@${profile.login}</h1>
          </div>
        </div>
        <a href="${profile.html_url}" target="_blank">
          <button class="primary-btn">Check Profile</button>
        </a>
      </div>

      <div class="about">
        <h2>About</h2>
        <p>${profile.bio || "No bio available"}</p>
      </div>

      <div class="status">
        <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers}</p>
        </div>
        <div class="status-item">
          <h3>Following</h3>
          <p>${profile.following}</p>
        </div>
        <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_repos}</p>
        </div>
      </div>
    </div>
  `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value.trim();
  if (!username) {
    loadingEl.innerText = "Please enter a username!";
    loadingEl.style.color = "red";
    return;
  }

  loadingEl.innerText = "Loading...";
  loadingEl.style.color = "black";

  try {
    const res = await fetch(`${baseUrl}/${username}`);
    const data = await res.json();

    if (res.ok) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateprofile(data);
    } else {
      loadingEl.innerText = data.message;
      loadingEl.style.color = "red";
      profileContainerEl.innerHTML = "";
    }
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "Something went wrong!";
    loadingEl.style.color = "red";
  }
};

searchButtonEl.addEventListener("click", fetchProfile);

