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

    async playMusic(src, volume = 0.25) {

        if (!src) return;

        const url = new URL(src, document.baseURI).href;

        if (this.music.src !== url) {

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

    async playAmbient(src, volume = 0.35) {

        if (!src) return;

        const url = new URL(src, document.baseURI).href;

        // Si ya está sonando el mismo ambiente, solo cambia el volumen
        if (this.ambient.src === url && !this.ambient.paused) {

            this.fade(this.ambient, volume, 2000);
            return;

        }

        this.ambient.pause();
        this.ambient.src = src;
        this.ambient.volume = 0;

        try {

            await this.ambient.play();

            this.fade(this.ambient, volume, 2000);

        } catch (e) {

            console.log("No se pudo reproducir el ambiente.");

        }

    }

    async playAmbientOnly(src, volume = 0.65) {

        if (!src) return;

        const url = new URL(src, document.baseURI).href;

        // Si ya está sonando, solo ajusta el volumen
        if (this.ambient.src === url && !this.ambient.paused) {

            this.ambient.volume = volume;
            return;

        }

        this.ambient.pause();
        this.ambient.src = src;
        this.ambient.volume = volume;

        try {

            await this.ambient.play();

        } catch (e) {

            console.log("No se pudo reproducir el ambiente.");

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
