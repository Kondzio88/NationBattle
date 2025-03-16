document.addEventListener('DOMContentLoaded', () => {
	// Chose country at start , circle start game section

	const circlesNation = document.querySelectorAll('.circle')

	// Circle Chose start game

	circlesNation.forEach(nation => {
		nation.addEventListener('mouseenter', () => {
			let nationId = nation.querySelector('img').alt

			const tooltip = document.createElement('div')
			tooltip.classList.add('tooltip')
			tooltip.innerHTML = `${nationId}`

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

let playerCardsArea = null
let computerCardsArea = null

let selectedPlayerUnit = ''
let selectedCompUnit = ''

let playerArray = ''
let computerArray = ''
let computerChoice = ''

// Global Varriables for battlefield

let currentPlayerUnit = null
let currentCompUnit = null

let playerUnitLifeDiv = null
let playerUnitPowerDiv = null

let compUnitLifeDiv = null
let compUnitPowerDiv = null

let compDivBattleCard = null
let playerDivBattleCard = null

let turnNumber = 0

// After Battle Display Variable

let textAfterBattle = 0

// Event Listener Bool Variable to avaible click

let isClicked = false

// Turn and draw variables

let playerFirst = 0
let isDraw = false

// Chose country by player and rander start Table

const choseCountry = nation => {
	let nationId = nation.querySelector('img').alt
	playerCardsArea = document.querySelector('.player-cards')
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

	playerSideHtml = document.querySelector('.player-side')
	playerSideHtml.style.backgroundImage = `url(${playerFlagLogo.src})`
}

// computer choice and render his table without nationId which chose player

const computerRandomChoice = nationId => {
	computerCardsArea = document.querySelector('.computer-cards')
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
		return computerRandomChoice(nationId)
	} else {
		computerNationName.innerHTML = computerChoice
		renderTable(computerArray, computerCardsArea)
	}

	compSideHtml = document.querySelector('.computer-side')
	compSideHtml.style.backgroundImage = `url(${computerFlagLogo.src})`
}

// Render table after choice country by player

const renderTable = (nationArr, renderArea) => {
	renderArea.innerHTML = '' // Clear previous content

	nationArr.forEach(({ hp, power, name, type, man, att, def, info, ability, img }) => {
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

		elHtml.querySelector('.life .progress').style.width = hp + '%'
		elHtml.querySelector('.power .progress').style.width = power + '%'

		if (hp <= 70 && hp > 30) {
			elHtml.querySelector('.life .progress').style.backgroundColor = 'orange'
		}
		if (hp <= 30) {
			elHtml.querySelector('.life .progress').style.backgroundColor = 'red'
		}

		elHtml.querySelector('.life .progress-text').innerHTML = hp + '%'
		elHtml.querySelector('.power .progress-text').innerHTML = power + '%'

		elHtml.unitData = { hp, power, name, type, man, att, def, info, ability, img }

		renderArea.appendChild(elHtml)

		// Click and selected Unit and add dataset

		elHtml.addEventListener('click', () => {
			choseUnit(elHtml.unitData, computerArray)

			startBattle(selectedPlayerUnit, selectedCompUnit)
		})
	})
}
// Konwert JSON data to unit JS

const choseUnit = function (data, computerArray) {
	selectedPlayerUnit = data

	selectedCompUnit = getRandomCompUnit(computerArray)

	if (!isDraw) {
		drawAndStartMove()
	}
}

function getRandomCompUnit(computerArray) {
	if (computerArray.length === 0) {
		return
	}
	let index = Math.floor(Math.random() * computerArray.length)

	let compUnit = computerArray[index]
	return compUnit
}

// Start battle  ,render battle field function

const startBattle = (playerUnit, compUnit) => {
	currentPlayerUnit = playerUnit
	currentCompUnit = compUnit

	const battleContainer = document.querySelector('.battle-container')
	const battlePlayerCard = document.querySelector('.player-side')
	const battleComputerCard = document.querySelector('.computer-side')

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
                <p>${playerUnit.info}</p>
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

	//  Current life nad power object render and text span

	playerUnitLifeDiv = htmlPlayerUnit.querySelector('.life .progress')
	playerUnitPowerDiv = htmlPlayerUnit.querySelector('.power .progress')

	playerUnitLifeDiv.style.width = playerUnit.hp + '%'
	playerUnitPowerDiv.style.width = playerUnit.power + '%'

	htmlPlayerUnit.querySelector('.life .progress-text').innerHTML = playerUnit.hp + '%'
	htmlPlayerUnit.querySelector('.power .progress-text').innerHTML = playerUnit.power + '%'

	if (playerUnit.hp == 100) {
		playerUnitLifeDiv.style.backgroundColor = 'green'
	}
	if (playerUnit.hp <= 70 && playerUnit.hp > 30) {
		playerUnitLifeDiv.style.backgroundColor = 'orange'
	}
	if (playerUnit.hp <= 30) {
		playerUnitLifeDiv.style.backgroundColor = 'red'
	}

	playerDivBattleCard = htmlPlayerUnit

	// Comp render card at battlefield

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
					<p>${compUnit.info}</p>
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

	//  Current life nad power object render and text span

	compUnitLifeDiv = htmlCompUnit.querySelector('.life .progress')
	compUnitPowerDiv = htmlCompUnit.querySelector('.power .progress')

	compUnitLifeDiv.style.width = compUnit.hp + '%'
	compUnitPowerDiv.style.width = compUnit.power + '%'

	htmlCompUnit.querySelector('.life .progress-text').innerHTML = compUnit.hp + '%'
	htmlCompUnit.querySelector('.power .progress-text').innerHTML = compUnit.power + '%'

	if (compUnit.hp == 100) {
		compUnitLifeDiv.style.backgroundColor = 'green'
	}
	if (compUnit.hp <= 70 && compUnit.hp > 30) {
		compUnitLifeDiv.style.backgroundColor = 'orange'
	}
	if (compUnit.hp <= 30) {
		compUnitLifeDiv.style.backgroundColor = 'red'
	}

	compDivBattleCard = htmlCompUnit

	battlePlayerCard.appendChild(htmlPlayerUnit)
	battleComputerCard.appendChild(htmlCompUnit)

	// Listener for attack, defense and abillity

	const actionButtons = document.querySelectorAll('.player-side button')
	actionButtons.forEach(button => {
		button.addEventListener('click', async () => {
			if (isClicked) {
				if (button.classList.contains('attack-btn')) {
					textAfterBattle = 1
					attack(compUnitLifeDiv, currentPlayerUnit, currentCompUnit, compDivBattleCard)
				} else if (button.classList.contains('ability-btn')) {
					textAfterBattle = 2
					abbilites(currentPlayerUnit, playerUnitPowerDiv)
				} else if (button.classList.contains('defense-btn')) {
					textAfterBattle = 3
				}
			}

			await displayBattleResult(currentPlayerUnit, currentCompUnit)

			turnNumber++
			isClicked = false

			if (turnNumber === 2 || currentPlayerUnit.hp <= 0 || currentCompUnit.hp <= 0) {
				setTimeout(() => {
					battleContainer.style.display = 'none'
					endTurn(playerArray, computerArray, currentPlayerUnit, currentCompUnit)
				}, 1000)
			} else {
				turnComp(currentCompUnit)
			}
		})
	})

	if (turnNumber < 2) {
		battleContainer.style.display = 'flex'
	}
	if (turnNumber === 2) {
		battleContainer.style.display = 'none'
		isDraw = true
	}

	if (turnNumber === 2) {
		endTurn(playerArray, computerArray, currentPlayerUnit, currentCompUnit)
	}
}

// Units player abbilites functions , and setInterval animation

const attack = (lifeDiv, attacker, deffender, divCard) => {
	let restAtt = 0

	let = document.querySelector('.computer-side .card-battle')

	if (deffender.hp >= 0) {
		if (deffender.def <= 0) {
			deffender.hp -= attacker.att
			divCard.classList.add('damage')
			restAtt = 0
			deffender.def = 0

			if (deffender.hp <= 0) {
				deffender.hp = 0
			}
		}
		if (deffender.def < attacker.att && deffender.def > 0) {
			restAtt = attacker.att - deffender.def
			deffender.hp -= restAtt
			deffender.def -= attacker.att
			divCard.classList.add('damage')

			if (deffender.def <= 0) {
				deffender.def = 0
			}
			if (deffender.hp <= 0) {
				deffender.hp = 0
			}
		}
		if (deffender.def > attacker.att) {
			deffender.def -= attacker.att
			divCard.classList.add('defense')
		}
		if (deffender.def == attacker.att) {
			deffender.def = 0
			divCard.classList.add('defense')
		}

		lifeDiv.style.width = deffender.hp + '%'
		lifeDiv.nextElementSibling.innerHTML = deffender.hp + '%'

		if (deffender.hp <= 70 && deffender.hp > 30) {
			lifeDiv.style.backgroundColor = 'orange'
		}
		if (deffender.hp <= 30) {
			lifeDiv.style.backgroundColor = 'red'
		}

		setTimeout(() => {
			startBattle(currentPlayerUnit, currentCompUnit)
		}, 1000)
	}
}

const abbilites = (unit, divPower) => {
	if (unit.power >= 100) {
		unit.power -= 100
		unit.ability()
	} else {
		return
	}
	divPower.style.width = unit.power + '%'

	setTimeout(() => {
		startBattle(currentPlayerUnit, currentCompUnit)
	}, 1000)
}

// Draw first turn function

const drawAndStartMove = () => {
	isDraw = true

	const drawInfoDiv = document.querySelector('.draw-info')
	const drawTextresult = document.querySelector('.draw-text-result')
	const drawTextResultWhoStart = document.querySelector('.draw-text-result-who-starts')

	drawTextResultWhoStart.innerHTML = ''
	drawInfoDiv.style.display = 'flex'

	let firtsMove = Math.floor(Math.random() * 2)

	setTimeout(() => {
		if (firtsMove === playerFirst) {
			drawTextresult.innerHTML = 'Ture rozpoczyna'
			drawTextResultWhoStart.innerHTML = 'Player'
		} else {
			drawTextresult.innerHTML = 'Ture rozpoczyna'
			drawTextResultWhoStart.innerHTML = 'Komputer'
		}
		setTimeout(() => {
			if (firtsMove === playerFirst) {
				isClicked = true
			} else {
				isClicked = false
				turnComp(currentCompUnit)
			}
			drawInfoDiv.style.display = 'none'
		}, 3000)
	}, 2000)
}

// Turn Player and Comp functions

const turnComp = async () => {
	let randomNumber = Math.floor(Math.random() * 3)

	if (turnNumber < 2) {
		if (randomNumber === 0) {
			attack(playerUnitLifeDiv, currentCompUnit, currentPlayerUnit, playerDivBattleCard)
			textAfterBattle = 1
		}
		if (randomNumber === 1 && currentCompUnit.power > 0) {
			abbilites(currentCompUnit, compUnitPowerDiv)
			textAfterBattle = 2
		} else if (randomNumber === 1 && currentCompUnit.power === 0) {
			turnComp()
			return
		}

		if (randomNumber === 2 && currentCompUnit.def !== 0) {
			compUnitActivities = currentCompUnit.def
			textAfterBattle = 3
		} else if (randomNumber === 2 && currentCompUnit.def === 0) {
			turnComp()
			return
		}

		await displayBattleResult(currentCompUnit, currentPlayerUnit)

		setTimeout(() => {
			if (turnNumber === 2 || currentPlayerUnit.hp <= 0 || currentCompUnit.hp <= 0) {
				endTurn(playerArray, computerArray, currentPlayerUnit, currentCompUnit)
				console.log('comp turn przed return');
				return
				console.log('comp turn po return');
				// trzeba battle display container dac na none i zbadac turn Number jakijest i czy sie resetuje
			}
			if (turnNumber < 2) {
				isClicked = true
				turnNumber++
				startBattle(currentPlayerUnit, currentCompUnit)
			}
		}, 1000)
	}
}

// End Turn Function

const endTurn = (arrayPlayer, arrayComp, currentPlayer, currentComp) => {
	console.log('end turn w end turn')

	let playerIndex = arrayPlayer.findIndex(x => x.name === currentPlayer.name)
	let compIndex = arrayComp.findIndex(x => x.name === currentComp.name)

	if (playerIndex !== -1) {
		arrayPlayer[playerIndex] = { ...currentPlayer }
	}
	if (compIndex !== -1) {
		arrayComp[compIndex] = { ...currentComp }
	}

	let filterArrayPlayer = arrayPlayer.filter(x => x.hp > 0)
	let filterArrayComp = arrayComp.filter(x => x.hp > 0)

	arrayPlayer.splice(0, arrayPlayer.length, ...filterArrayPlayer)
	arrayComp.splice(0, arrayComp.length, ...filterArrayComp)

	renderTable(arrayPlayer, playerCardsArea)
	renderTable(arrayComp, computerCardsArea)

	isDraw = false
	turnNumber = 0
}

// Display After Battle functions

const displayBattleResult = async (attacker, deffender) => {
	const battleResultDiv = document.querySelector('.battle-result')
	const attackerUnitName = document.querySelector('.attack-name')
	const textAttack = document.querySelector('.text-attack')
	const textDeffense = document.querySelector('.text-deffense')
	const deffenderUnitName = document.querySelector('.deffend-name')
	const button = document.querySelector('.btn-ok')

	attackerUnitName.innerHTML = ''
	textAttack.innerHTML = ''
	deffenderUnitName.innerHTML = ''
	textDeffense.innerHTML = ''

	attackerUnitName.innerHTML = `${attacker.name}`
	if (textAfterBattle == 1) {
		textAttack.innerHTML = `Zaatakowala z sila ${attacker.att}`
		deffenderUnitName.innerHTML = `${deffender.name}`
		textDeffense.innerHTML = `zostalo ${deffender.def} obrony`
		if (deffender.hp < 100) {
			deffenderUnitName.innerHTML = `${deffender.name}`
			deffenderUnitName.innerHTML = `${deffender.name} `
			textDeffense.innerHTML = `zostalo 0 oborny <br> zostalo ${deffender.hp} zycia`
		}
	}
	if (textAfterBattle == 2) {
		textAttack.innerHTML = `Uzyl Umiejetnosci ${attacker.info}`
	}
	if (textAfterBattle == 3) {
		textAttack.innerHTML = `Broni sie oborna ${attacker.def}`
	}

	await new Promise(res => setTimeout(res, 1000))

	battleResultDiv.style.display = 'flex'

	await new Promise(res => {
		button.addEventListener('click', res, { once: true })
	})

	textAfterBattle = 0
	battleResultDiv.style.display = 'none'
}
