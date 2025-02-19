document.addEventListener('DOMContentLoaded', () => {
	// Chose country at start , circle start game section

	const circlesNation = document.querySelectorAll('.circle')

	// Circle Chose start game

	circlesNation.forEach(nation => {
		nation.addEventListener('mouseenter', () => {
			let nationId = nation.querySelector('img').alt

			const tooltip = document.createElement('div')
			tooltip.classList.add('tooltip')
			tooltip.innerHTML = `Wybierz ${nationId}`

			nation.appendChild(tooltip)

			nation.addEventListener('mouseleave', () => {
				tooltip.remove()
			})
		})
		nation.addEventListener('click', () => {
			choseCountry(nation)
		})
	})
})

// Global Varriabels

const startGameContainer = document.querySelector('.start-game-container')
const playerFlagLogo = document.querySelector('.player-logo')
const playerCountryName = document.querySelector('.player-nation h1')

let selectedPlayerUnit = ''
let selectedCompUnit = ''

let playerArray = ''
let computerArray = ''
let computerChoice = ''

// Chose country by player and rander start Table

const choseCountry = nation => {
	let nationId = nation.querySelector('img').alt
	const playerCardsArea = document.querySelector('.player-cards')
	renderStartTable(nationId, playerCardsArea)
	startGameContainer.style.display = 'none'
	computerRandomChoice(nationId)
}

const renderStartTable = (nationId, playerCardsArea) => {
	

	if (nationId === 'Usa') {
		playerArray = usa
		renderTable(usa, playerCardsArea)
		playerFlagLogo.src = 'images/usa-logo.png'
	} else if (nationId === 'Israel') {
		playerArray = israel
		renderTable(israel, playerCardsArea)
		playerFlagLogo.src = 'images/israel-logo.png'
	} else if (nationId === 'China') {
		playerArray = china
		renderTable(china, playerCardsArea)
		playerFlagLogo.src = 'images/china-logo.png'
	} else if (nationId === 'Russia') {
		playerArray = russia
		renderTable(russia, playerCardsArea)
		playerFlagLogo.src = 'images/russia-logo.png'
	}
	playerCountryName.innerHTML = nationId
}

// computer choice and render his table without nationId which chose player


const computerRandomChoice = nationId => {
	const computerCardsArea = document.querySelector('.computer-cards')
	const computerFlagLogo = document.querySelector('.computer-logo')
	const computerNationName = document.querySelector('.computer-nation h1')

	let randomNumber = Math.floor(Math.random() * 12)

	if (randomNumber > 9) {
		computerChoice = 'Usa'
		computerArray = usa
		computerFlagLogo.src = 'images/usa-logo.png	'
	} else if (randomNumber > 6) {
		computerChoice = 'Russia'
		computerArray = russia
		computerFlagLogo.src = 'images/russia-logo.png	'
	} else if (randomNumber > 3) {
		computerChoice = 'China'
		computerArray = china
		computerFlagLogo.src = 'images/china-logo.png	'
	} else {
		computerChoice = 'Israel'
		computerArray = israel
		computerFlagLogo.src = 'images/israel-logo.png	'
	}

	if (computerChoice === nationId) {
		computerRandomChoice(nationId)
	} else {
		computerNationName.innerHTML = computerChoice
		renderTable(computerArray, computerCardsArea)
	}
}

// Render table after choice country by player

const renderTable = (nationArr, renderArea) => {
	renderArea.innerHTML = '' // Clear previous content

	nationArr.forEach(({ name, type, man, att, def, info, ability, img }) => {
		const elHtml = document.createElement('div')
		elHtml.classList.add('card')
		elHtml.innerHTML = `
            <div class="life">
                <div class="progress"></div>
                <span class="progress-text">100%</span>
            </div>
            <div class="power">
                <div class="progress"></div>
                <span class="progress-text">100%</span>
            </div>
            <h3>${name}</h3>
            <img src=${img} alt="">
            <p>${info}</p>
            <div class="info">
                <div class="att">
                    <i class='bx bxs-chevrons-up'></i>
                    <p>${att}</p>
                </div>
                <div class="def">
                    <i class='bx bx-shield'></i>
                    <p>${def}</p>
                </div>
            </div>`

		elHtml.dataset.unit = JSON.stringify({ name, type, man, att, def, info, ability, img })

		renderArea.appendChild(elHtml)

		elHtml.addEventListener('click', () => {
			choseUnit(elHtml.dataset.unit, computerArray)

			startBattle(selectedPlayerUnit, selectedCompUnit)
		})
	})

	// Konwert JSON data to unit JS

	const choseUnit = function (data, computerArray) {
		selectedPlayerUnit = JSON.parse(data)

		selectedCompUnit = getRandomCompUnit(computerArray)
	}

	function getRandomCompUnit(computerArray) {
		if (computerArray.length === 0) {
			return
		}
		let index = Math.floor(Math.random() * computerArray.length)

		let compUnit = computerArray[index]
		return compUnit
	}

	// Start battle global function

	const startBattle = (playerUnit, compUnit) => {
		
		const battleContainer = document.querySelector('.battle-container')
		const battlePlayerCard = document.querySelector('.player-side .card-battle')
		const battleComputerCard = document.querySelector('.computer-side .card-battle')
		
		battlePlayerCard.innerHTML = ''
		battleComputerCard.innerHTML = ''

		const htmlPlayerUnit = document.createElement('div')
		htmlPlayerUnit.classList.add('card-battle')
		htmlPlayerUnit.innerHTML = `<div class="life">
                    <div class="progress"></div>
                    <span class="progress-text">100%</span>
                </div>
                <div class="power">
                    <div class="progress"></div>
                    <span class="progress-text">100%</span>
                </div>
                <h3>${playerUnit.name}</h3>
                <img src=${playerUnit.img} alt="">
                <p>umiejetnosc niszczenia + 20 att</p>
                <div class="action">
                    <button class="attack-btn">atakuj</button>
                    <button class="ability-btn">umiejetnosc</button>
                    <button class="defense-btn">bron sie</button>
                </div>
                <div class="info">
                    <div class="att">
                        <i class='bx bxs-chevrons-up'></i>
                        <p>${playerUnit.att}</p>
                    </div>
                    <div class="def">
                        <i class='bx bx-shield'></i>
                        <p>${playerUnit.def}</p>
                    </div>
                </div>`


			const htmlCompUnit = document.createElement('div')
			htmlCompUnit.classList.add('card-battle')
			htmlCompUnit.innerHTML = `<div class="life">
						<div class="progress"></div>
						<span class="progress-text">100%</span>
					</div>
					<div class="power">
						<div class="progress"></div>
						<span class="progress-text">100%</span>
					</div>
					<h3>${compUnit.name}</h3>
					<img src=${compUnit.img} alt="">
					<p>umiejetnosc niszczenia + 20 att</p>
					<div class="action">
						<button class="attack-btn">atakuj</button>
						<button class="ability-btn">umiejetnosc</button>
						<button class="defense-btn">bron sie</button>
					</div>
					<div class="info">
						<div class="att">
							<i class='bx bxs-chevrons-up'></i>
							<p>${compUnit.att}</p>
						</div>
						<div class="def">
							<i class='bx bx-shield'></i>
							<p>${compUnit.def}</p>
						</div>
					</div>`

				battlePlayerCard.appendChild(htmlPlayerUnit)
				battleComputerCard.appendChild(htmlCompUnit)

				battleContainer.style.display = 'flex'
	}
}
