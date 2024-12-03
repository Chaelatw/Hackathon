class GitHubUser {
    constructor(username) {
        this.username = username;
        this.clientID = 'YOUR_GITHUB_CLIENT_ID';  // Replace with your GitHub client ID
        this.clientSecret = 'YOUR_GITHUB_CLIENT_SECRET';  // Replace with your GitHub client secret
    }

    async fetchUserData() {
        try {
            const userResponse = await fetch(`https://api.github.com/users/${this.username}?client_id=${this.clientID}&client_secret=${this.clientSecret}`);
            const userData = await userResponse.json();
            this.displayUserProfile(userData);
            this.fetchUserRepos();
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    }

    async fetchUserRepos() {
        try {
            const reposResponse = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=5&client_id=${this.clientID}&client_secret=${this.clientSecret}`);
            const reposData = await reposResponse.json();
            this.displayUserRepos(reposData);
        } catch (error) {
            console.error("Error fetching repositories", error);
        }
    }

    displayUserProfile(userData) {
        document.getElementById('avatar').src = userData.avatar_url;
        document.getElementById('name').textContent = userData.name || 'No name available';
        document.getElementById('joined').textContent = `Joined on: ${new Date(userData.created_at).toLocaleDateString()}`;
        document.getElementById('website').textContent = userData.blog ? `Website: ${userData.blog}` : 'No website provided';
        document.getElementById('githubLink').href = userData.html_url;
    }

    displayUserRepos(reposData) {
        const repoList = document.getElementById('repoList');
        repoList.innerHTML = '';  
        reposData.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || 'No description available'}</p>
            `;
            repoList.appendChild(li);
        });
    }
}


function fetchGitHubUserData() {
    const username = prompt("Enter a GitHub username:");  
    const user = new GitHubUser(username);
    user.fetchUserData();
}


fetchGitHubUserData();
