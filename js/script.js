//This div is where my profile information will appear
const profileOverview = document.querySelector(".overview");

let username = "HenryDelGlitch";

const repoList = document.querySelector(".repo-list");

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

const displayRepos = async function(repos){
    for(const projects of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${projects.name}</h3>`;
        repoList.append(li);
    }
};