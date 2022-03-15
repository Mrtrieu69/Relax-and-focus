const day = document.querySelector("#day")
const rainyDay = document.querySelector("#rainy-day")
const night = document.querySelector("#night")
const rainyNight = document.querySelector("#rainy-night")
const videos = document.querySelectorAll("video")
const toggleMode = document.querySelector(".toggle__mode")
const toggleRainy = document.querySelector(".toggle__rainy")
const soundInput = document.querySelector(".toggle__rainy-control-sound")
const toggleRainyControl = document.querySelector(".toggle__rainy-control")
const audioRain = document.querySelector("#audio-rain")
const musicSoundInput = document.querySelector(".controls-content__sound-input")
const controlItems = document.querySelectorAll(".controls__sidebar-item")
const controlItemsContent = document.querySelectorAll(".controls__sidebar-item-content")
const audioMusic = document.querySelector("#audio-music")
const authorImage = document.querySelector(".author__image")
const prevBtn = document.querySelector(".playlist__prev-image")
const nextBtn = document.querySelector(".playlist__next-image")
const playBtn = document.querySelector(".playlist__play-image")
const pauseBtn = document.querySelector(".playlist__pause-image")
const toggleBtn = document.querySelector(".playlist__toggle-image")
const moods = document.querySelectorAll(".controls-content__mood")
const authorImageMobile = document.querySelector(".sidebar-mobile__author img")
const sidebarMobileBtn = document.querySelector(".sidebar-mobile-btn")
const sidebarMobile = document.querySelector(".sidebar-mobile")
const sidebarMobileLayout = document.querySelector(".sidebar-mobile__layout")
const closeSideBarMobileBtn = document.querySelector(".sidebar-mobile__close")


const app = {
    isRainy: false,
    isDay: true,
    isPlay: false,
    currentSong: 0,
    currentMusic: [],

    focusMusic: [
        {
            author: "assets/img/focus1.png",
            music: "assets/music/focus1.mp3"
        },
        {
            author: "assets/img/focus2.png",
            music: "assets/music/focus2.mp3"
        },
        {
            author: "assets/img/focus3.png",
            music: "assets/music/focus3.mp3"
        },
    ],

    sleepyMusic: [
        {
            author: "assets/img/sleepy1.png",
            music: "assets/music/sleepy1.mp3"
        },
        {
            author: "assets/img/sleepy2.png",
            music: "assets/music/sleepy2.mp3"
        },
        {
            author: "assets/img/sleepy3.png",
            music: "assets/music/sleepy3.mp3"
        },
    ],

    chillMusic: [
        {
            author: "assets/img/chill1.jpg",
            music: "assets/music/chill1.mp3"
        },
        {
            author: "assets/img/chill2.jpg",
            music: "assets/music/chill2.mp3"
        },
        {
            author: "assets/img/chill3.jfif",
            music: "assets/music/chill3.mp3"
        },
    ],

    renderVideo(){
        videos.forEach(video => {
            video.classList.add("hide")
        })
        if(this.isDay && this.isRainy){
            rainyDay.classList.remove("hide")
        }else if(this.isDay && !this.isRainy){
            day.classList.remove("hide")
        }else if(!this.isDay && this.isRainy){
            rainyNight.classList.remove("hide")
        }else if(!this.isDay && !this.isRainy){
            night.classList.remove("hide")
        }
    },

        
    playAudioRain(isRainy){
        if(isRainy){
            audioRain.play()
        }else{
            audioRain.pause()
        }
    },

    handleEvents(){
        const _this = this

        audioRain.volume = soundInput.value / 100
        audioMusic.volume = musicSoundInput.value / 100
        
        
        toggleMode.onclick = () => {
            this.isDay = !this.isDay
            toggleMode.classList.toggle("night", !this.isDay)
            this.renderVideo()
        }

        toggleRainy.onclick = () =>{
            this.isRainy = !this.isRainy
            toggleRainy.classList.toggle("rainy", this.isRainy)
            this.renderVideo()
            this.playAudioRain(this.isRainy)
        }

        soundInput.oninput = (e) => {
            const progress = e.target.value
            soundInput.style.background = `linear-gradient(90deg, rgb(244,176,101) ${progress}%, #14141d ${progress}%)`
            audioRain.volume = progress / 100
        }

        toggleRainyControl.onclick = (e) => {
            e.stopPropagation()
        }

        controlItemsContent.forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation()
            }
        })

        musicSoundInput.oninput = (e) => {
            const progress = e.target.value
            musicSoundInput.style.background = `linear-gradient(90deg, rgb(244,176,101) ${progress}%, #14141d ${progress}%)`
            audioMusic.volume = progress / 100
        }
        
        controlItems.forEach(item => {
            item.onclick = () =>{
                if(document.querySelector(".controls__sidebar-item.active")){
                    if(item === document.querySelector(".controls__sidebar-item.active")){
                        item.classList.remove("active")
                        return
                    }
                    document.querySelector(".controls__sidebar-item.active").classList.remove("active")
                }
                item.classList.add("active")
            }
        })

        toggleBtn.onclick = () => {
            if(this.isPlay){
                audioMusic.pause()
            }else{
                audioMusic.play()
            }
        }

        audioMusic.onplay = () => {
            toggleBtn.classList.add("wave")
            setTimeout(() => toggleBtn.classList.remove("wave"), 1000)
            this.isPlay = true
            toggleBtn.classList.add("play")
            animationImage.play()
            animationImageMobile.play()
        }

        audioMusic.onpause = () => {
            this.isPlay = false
            toggleBtn.classList.remove("play")
            animationImage.pause()
            animationImageMobile.pause()
        }

        audioMusic.onended = () => {
            nextBtn.click()
        }

        moods.forEach(mood => {
            mood.onclick = () => {
                if(document.querySelector(".controls-content__mood.active")){
                    if(mood === document.querySelector(".controls-content__mood.active")){
                        return
                    }
                    document.querySelector(".controls-content__mood.active").classList.remove("active")
                }
                if(this.isPlay){
                    setTimeout(() => audioMusic.play(), 500)
                }
                mood.classList.add("active")
                this.renderListMusic(mood.dataset.type)
            }
        })

        nextBtn.onclick = () => {
            this.currentSong++
            if(this.currentSong >= this.currentMusic.length){
                this.currentSong = 0
            }
            this.renderMusic()
            audioMusic.play()
        }

        prevBtn.onclick = () => {
            this.currentSong--
            if(this.currentSong <= -1){
                this.currentSong = this.currentMusic.length - 1
            }
            this.renderMusic()
            audioMusic.play()
        }

        sidebarMobileBtn.onclick = () => this.show()
        sidebarMobileLayout.onclick = () => this.hide()
        closeSideBarMobileBtn.onclick = () => this.hide()

        const animationImage = authorImage.animate([{ transform: "rotate(360deg)"}],{
            duration: 10000,
            iterations: Infinity
        })

        const animationImageMobile = authorImageMobile.animate([{ transform: "rotate(360deg)"}],{
            duration: 10000,
            iterations: Infinity
        })

        animationImage.pause()
        animationImageMobile.pause()
    },

    show(){
        sidebarMobileLayout.style.display = "block"
        sidebarMobile.style.transform = " translateX(0)"
        sidebarMobile.style.opacity = 1
    },

    hide(){
        sidebarMobileLayout.style.display = "none"
        sidebarMobile.style.transform = " translateX(-100%)"
        sidebarMobile.style.opacity = 0.7
    },

    renderListMusic(type){
        if(type === "focus"){
            this.currentMusic = [...this.focusMusic]
        }
        if(type === "chill"){
            this.currentMusic = [...this.chillMusic]
        }
        if(type === "sleepy"){
            this.currentMusic = [...this.sleepyMusic]
        }

        this.renderMusic()
    },

    renderMusic(){
        const { author, music } = this.getCurrentSong()
        audioMusic.src = music
        authorImage.src = author
        authorImageMobile.src = author
    },  

    getCurrentSong(){
        return this.currentMusic[this.currentSong]
    },

    start(){
        this.handleEvents()
        this.renderListMusic(document.querySelector(".controls-content__mood.active").dataset.type)
    }
}

app.start()
