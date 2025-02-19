class Units {
	constructor( name, type, man, att, def, img, info, ability) {
		this.hp = 100
		this.power = 100
		this.name = name
		this.type = type
		this.manouver = man
		this.att = att
		this.def = def
		this.img = img
		this.info = info
		this.ability = ability
	}
}

// USA Units Stack

let usa = []

const abrams = new Units(
	'M1 Abrams',
	'Tank',
	'Land',
	60,
	70,
	'images/usa-abrams.png',
	'penetracja + 20 att',
	function () {
		this.att += 20
	}
)

const apache = new Units(
	'AH-64 Apache',
	'Heli',
	'Sky',
	50,
	50,
	'images/usa-apache.png',
	'pociski p.panc + 30 att',
	function () {
		this.att += 30
	}
)

const marins = new Units(
	'US Marines',
	'Infa',
	'Land',
	40,
	40,
	'images/usa-marines.png',
	'komandosi + 10 att + 10 def',
	function () {
		this.att += 10
		this.def += 10
	}
)

const dreadnout = new Units(
	'USS Dreadnouth',
	'Ship',
	'Sea',
	70,
	70,
	'images/usa-dreadnouth.png',
	'pociski z/p + 20 att',
	function () {
		this.att += 20
	}
)

usa.push(abrams, apache, marins, dreadnout)

// Russia Units Stack

let russia = []

const t90 = new Units(
	'T-90',
	'Tank',
	'Land',
	50,
	70,
	'images/russia-t90.png',
	'pancerz reaktywny + 20 def',
	function () {
		this.def += 20
	}
)

const k52 = new Units(
	'K-52 Alligator',
	'Heli',
	'Sky',
	50,
	50,
	'images/russia-k52.png',
	'pociski p.panc + 30 att',
	function () {
		this.att += 30
	}
)

const specnaz = new Units(
	'Spec-Naz',
	'Infa',
	'Land',
	40,
	50,
	'images/russia-specnaz.png',
	'dywersyfikacyja + 20 def',
	function () {
		this.def += 20
	}
)

const corvetta = new Units(
	'Moskwa',
	'Infa',
	'Ship',
	60,
	70,
	'images/russia-corvetta.png',
	'system OPLT + 20 def',
	function () {
		this.def += 20
	}
)

russia.push(t90, k52, specnaz, corvetta)

//  Israel Units Stack

let israel = []

const merkava = new Units(
	'Merkava',
	'Tank',
	'Land',
	60,
	70,
	'images/israel-merkava.png',
	'iron vision + 20 def',
	function () {
		this.def += 20
	}
)

const mosad = new Units('Mosad', 'Infa', 'Land', 40, 50, 'images/israel-infantry.png', 'wywiad + 30 hp', function () {
	this.hp += 30
})

const haaver = new Units(
	'Haver',
	'Heli',
	'Sky',
	50,
	60,
	'images/israel-heli.png',
	'pociski p.panc + 20 att',
	function () {
		this.att += 20
	}
)

const frigate = new Units(
	'Frigate type 23',
	'Ship',
	'Sea',
	60,
	70,
	'images/israel-frigate23.png',
	'fregata rakietowa + 30 att',
	function () {
		this.att += 30
	}
)

israel.push(merkava, haaver, mosad, frigate)

// China Units Stack

let china = []

const zhonguo = new Units(
	'Zhonguo',
	'Infa',
	'Land',
	40,
	40,
	'images/china-infantry.png',
	'wojska ludowe + 10 def + 10 hp',
	function () {
		this.def += 10
		this.hp += 10
	}
)

const type99 = new Units(
	'Type 99',
	'Tank',
	'Land',
	60,
	60,
	'images/china-type99.png',
	'niszczyciel + 10 def + 20 att',
	function () {
		this.def += 10
		this.att += 20
	}
)

const mi24 = new Units(
	'Mi 24',
	'Heli',
	'Sky',
	50,
	50,
	'images/china-mi24.png',
	'wsparcie + 10 def + 10 att',
	function () {
		this.def += 10
		this.att += 10
	}
)

const akula = new Units(
	'Type Akula',
	'Ship',
	'Sea',
	80,
	30,
	'images/china-akula.png',
	'okret atomowy + 20 att',
	function () {
		this.att += 20
	}
)

china.push(type99, mi24, zhonguo, akula)
