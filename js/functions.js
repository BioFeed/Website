class Menu {
	constructor() {
		this.toggle = document.querySelector(".toggle")
		this.menu = document.querySelector("nav")
		this.events()

		this.state = false
	}
	events() {
		this.toggle.addEventListener("click", e => {
			this.toggleMenu()
		})
	}
	toggleMenu() {
		this.menu.classList.toggle("active")
		this.state = !this.state

		if (this.state === true) {
			this.toggle.innerHTML = "<lunar-icon icon=\"times\"></lunar-icon>"
		} else {
			this.toggle.innerHTML = "<lunar-icon icon=\"menu\"></lunar-icon>"
		}
	}
}

class RaspberryPI {
	constructor() {
		this.canvas = document.getElementById("video")
		this.ctx = this.canvas.getContext("2d")

		this.wHeihgt = window.innerHeight
		if (this.isSafari) {
			this.video()
			this.window()
		} else {
			this.image()
		}
	}
	get isSafari() {
		return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
	}
	image() {
		const image = new Image(540, 475)
		image.src = "../img/rasp-chrome.png"
		image.onload = () => {
			this.ctx.drawImage(image, 0, 0, 540, 475)
		}
	}
	video() {
		this.video = document.createElement("video")

		this.video.src = "../img/raspberry_pi.mp4"
		this.video.addEventListener('loadeddata', () => {
			this.update(); //Start rendering
		});
	}
	window() {
		window.addEventListener('scroll', e => {
			this.top = this.canvas.getBoundingClientRect().top
			this.update()
		})
		window.addEventListener('resize', e => {
			this.wHeihgt = window.innerHeight
			this.top = this.canvas.getBoundingClientRect().top
			this.update()
		})
	}
	update() {
		let percent = (this.top / this.wHeihgt) + 0.2
		if (percent > 1) {
			percent = 1
		}
		if (percent < 0) {
			percent = 0
		}
		const frame = percent * 90
		const time = frame / 30
		this.video.currentTime = time;
		this.ctx.drawImage(this.video, 0, 0, 540, 475);
	}
}

const pi = new RaspberryPI()
const menu = new Menu()
