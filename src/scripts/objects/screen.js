const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<img src="${user.avatarUrl}" alt="Foto de perfil do usuário"
        <div class="info">
            <div class="data">           
                <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                <p> bio: ${user.bio ?? "Não possui nome cadastrado"}</p>
                <p>followers: ${user.followers ?? "Não possui nome cadastrado"}</p>
                <p>following: ${user.following ?? "Não possui nome cadastrado"}</p>
                
            </div> 
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach((repo) => {
            console.log(repo);
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"> ${repo.name} 
            <div class="stats-repo">    <span class="stats">👀 ${repo.watchers_count}</span> 
            <span class="stats">🍴 ${repo.forks_count}</span>      <span class="stats">⭐ ${repo.stargazers_count}</span>  
            <span class="stats">📖 ${repo.language}</span>
        </div>
            </a>
        </li>`
        })
         
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class= "repositories section">
                    <h2> Repositorios </h2>
                    <ul>${repositoriesItens}</ul>
                    </div> `
        }

        let eventsItens = ''
        let eventType = ''



        user.events.forEach((event) => {
            if (event.type === 'PushEvent') {
                eventType = event.payload.commits[0].message
            } else if (event.type === "CreateEvent") {
                eventType = event.payload.ref_type
            }

            eventsItens += `<li><a href="https://github.com/${event.repo.name}"   target="_blank"><span class="event-type"> ${eventType}</span> ${event.repo.name} </a></li>`
        })



        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class= "events section">
                    <h2> Events </h2>
                    <ul>${eventsItens}</ul>
                    </div> `
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado </h3>'
    }
}

export { screen }