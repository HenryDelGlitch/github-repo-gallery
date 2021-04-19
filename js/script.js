//This div is where my profile information will appear
const profileOverview = document.querySelector(".overview");

let username = "HenryDelGlitch";

const gitInfo = async function(){
    username = await fetch(`https://api.github.com/users/${username}`);
    const rec = await username.json();
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
};

