class AudioManager {

    constructor() {

        this.music = new Audio();
        this.music.loop = true;
        this.music.volume = 0;

        this.ambient = new Audio();
        this.ambient.loop = true;
        this.ambient.volume = 0;

    }

    fade(audio, targetVolume, duration) {

        const startVolume = audio.volume;
        const steps = 40;
        const stepTime = duration / steps;
        const delta = (targetVolume - startVolume) / steps;

        let currentStep = 0;

        const interval = setInterval(() => {

            currentStep++;

            audio.volume += delta;

            if (currentStep >= steps) {

                audio.volume = targetVolume;

                clearInterval(interval);

            }

        }, stepTime);

    }

    async playAmbient(src, volume = 0.5) {

        if (this.ambient.src !== new URL(src, document.baseURI).href) {

            this.ambient.pause();

            this.ambient.src = src;

        }

        try {

            await this.ambient.play();

            this.fade(this.ambient, volume, 1500);

        } catch (e) {

            console.log("No se pudo reproducir el sonido ambiente.");

        }

    }

    async playMusic(src, volume = 0.25) {

        if (this.music.src !== new URL(src, document.baseURI).href) {

            this.music.pause();

            this.music.src = src;

            this.music.volume = 0;

        }

        try {

            await this.music.play();

            this.fade(this.music, volume, 4000);

        } catch (e) {

            console.log("No se pudo reproducir la música.");

        }

    }

    stopMusic() {

        this.music.pause();
        this.music.currentTime = 0;

    }

    stopAmbient() {

        this.ambient.pause();
        this.ambient.currentTime = 0;

    }

    stopAll() {

        this.stopMusic();
        this.stopAmbient();

    }

}
