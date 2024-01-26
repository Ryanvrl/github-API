import { getUser } from "./services/user.js"
import { getRepos } from "./services/repositories.js"
import { getEvents} from './services/events.js';
import  { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.querySelector('#btn-search').addEventListener('click', function () {
    const userName = document.getElementById('input-search').value
    if (validadeInput(userName)) return
    getUserData(userName)
})

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validadeInput(userName)) return
        getUserData(userName)
    }
})

function validadeInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepos(userName)
    const eventsResponse = await getEvents(userName)

    if(userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
}
