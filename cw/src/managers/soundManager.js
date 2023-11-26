
export class SoundManager {
	constructor() {
		this.clips = [];
		this.loaded = false;
		this.soundArray = [
			"assets/music/aliens-run.mp3",
			"assets/music/game-over.mp3",
			"assets/music/victory.mp3"
		];
	}

	init(){
		this.context = new AudioContext();
		this.unlockAudioContext(this.context);
		this.gainNode = this.context.createGain ?
			this.context.createGain() : this.context.createGainNode();
		this.gainNode.connect(this.context.destination);
		this.loadArray();
		console.log(this.clips);
	}

	loadArray(){
		for (let i = 0; i < this.soundArray.length; i++){
			this.load(this.soundArray[i], () => {
				if(this.soundArray.length === Object.keys(this.clips).length){
					for (let clip of this.clips){
						if (!clip.loaded) return;
					}
					this.loaded = true;
				}
			});
		}
	}

	load(path, callback){
		if(this.clips[path]){
			callback(this.clips[path]);
		}
		let clip = { path: path, buffer: null, loaded: false };
		this.clips[path] = clip;
		let request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.responseType = 'arraybuffer';
		request.onload = () => {
			this.context.decodeAudioData(request.response,
				function (buffer){
					clip.buffer = buffer;
					clip.loaded = true;
					callback(clip);
				});
		};
		request.send();
	}

	play(path, settings){
		if(!this.loaded){
			setTimeout(() => {
				this.play(path, settings);
			}, 1000);
			return;
		}
		let looping = false;
		let volume = 1;
		if(settings){
			if(settings.looping){
				looping = settings.looping;
			}
			if (settings.volume){
				volume = settings.volume;
			}
		}
		let clip = this.clips[path];

		if (clip === null){
			return false;
		}
		this.context.resume().then(r => {
			console.log(clip.buffer);
			let sound = this.context.createBufferSource();
			sound.buffer = clip.buffer;
			sound.connect(this.gainNode);
			sound.loop = looping;
			this.gainNode.gain.value = volume;
			sound.start(0);
			return true;
		})
	}

	toggleMute(){
		if(this.gainNode.gain.value > 0){
			this.gainNode.gain.value = 0;
		} else {
			this.gainNode.gain.value = 1;
		}
	}

	stopAll(){
		this.gainNode.disconnect();
		this.gainNode = this.context.createGain();
		this.gainNode.connect(this.context.destination);
	}

	unlockAudioContext(audioCtx) {
		if (audioCtx.state !== 'suspended') return;
		const b = document.body;
		const events = ['touchstart','touchend', 'mousedown','keydown'];
		events.forEach(e => b.addEventListener(e, unlock, false));
		function unlock() { audioCtx.resume().then(clean); }
		function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
	}
}