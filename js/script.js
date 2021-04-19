//This div is where my profile information will appear
const profileOverview = document.querySelector(".overview");

let username = "HenryDelGlitch";

const repoList = document.querySelector(".repo-list");

//Shows all the repos in the section
const repoInformation = document.querySelector(".repos");

//Shows one repo in the section
const singleRepo = document.querySelector(".repo-data");

const backButton = document.querySelector(".view-repos");

const filterInput = document.querySelector(".filter-repos");

const gitInfo = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const rec = await userInfo.json();
    gitUserData(rec);
};

gitInfo();

const gitUserData = async function(json){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = ` <figure>
            <img alt="user avatar" src=${json.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${json.name}</p>
            <p><strong>Bio:</strong> ${json.bio}</p>
            <p><strong>Location:</strong> ${json.location}</p>
            <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
        </div> `;

    profileOverview.append(div);
    gitRepos();
};

const gitRepos = async function(){
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=40`);
    const repoData = await repos.json();
    displayRepos(repoData);
};

filterInput.classList.remove("hide");

filterInput.addEventListener("input", function(e){
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerSearch = search.toLowerCase();

    for (const repoSearch of repos){
        const lowerInner = repoSearch.innerText.toLowerCase();
        if(lowerInner.includes(lowerSearch)){
            repoSearch.classList.remove("hide");
        }else{
            repoSearch.classList.add("hide");
        };
    };
});

const displayRepos = async function(repos){
    for(const projects of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${projects.name}</h3>`;
        repoList.append(li);
    };
};

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        repoDetails(repoName);
    }
});

const repoDetails = async function(repoName){
    const repoDesc = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoDesc.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];

    for(const language in languageData){
        languages.push(language);
    };

    showsRepoDetails(repoInfo, languages);
}

const showsRepoDetails = async function(repoInfo, languages){
    singleRepo.innerHTML = ``;
    singleRepo.classList.remove("hide");
    repoInformation.classList.add("hide");
    backButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    singleRepo.append(div);
};

backButton.addEventListener("click", function(){
    repoInformation.classList.remove("hide");
    singleRepo.classList.add("hide");
    backButton.classList.add("hide");
});