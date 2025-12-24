// 音频管理器
class AudioManager {
    constructor() {
        this.bgMusic = null;
        this.sounds = {};
        this.musicEnabled = true;
        this.soundsEnabled = true;
        this.init();
    }

    init() {
        // 初始化背景音乐
        this.bgMusic = new Audio('jingle_bells.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;

        // 初始化音效
        this.sounds.chicken = new Audio('chicken_sound.mp3');
        this.sounds.chicken.volume = 0.5;

        // 预加载音频
        this.preloadAudio();
    }

    preloadAudio() {
        // 预加载背景音乐
        this.bgMusic.load();
        
        // 预加载音效
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }

    // 播放背景音乐
    playBackgroundMusic() {
        if (this.musicEnabled && this.bgMusic) {
            this.bgMusic.play().catch(e => {
                console.log('背景音乐播放失败:', e);
            });
        }
    }

    // 暂停背景音乐
    pauseBackgroundMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
        }
    }

    // 播放音效
    playSound(soundName) {
        if (this.soundsEnabled && this.sounds[soundName]) {
            const sound = this.sounds[soundName];
            sound.currentTime = 0; // 从头开始播放
            sound.play().catch(e => {
                console.log('音效播放失败:', e);
            });
        }
    }

    // 设置音乐开关
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.pauseBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
        return this.musicEnabled;
    }

    // 设置音效开关
    toggleSounds() {
        this.soundsEnabled = !this.soundsEnabled;
        return this.soundsEnabled;
    }

    // 获取音频状态
    getStatus() {
        return {
            music: this.musicEnabled,
            sounds: this.soundsEnabled
        };
    }
}

// 全局音频管理器实例
window.audioManager = new AudioManager();

// 页面加载完成后自动播放背景音乐（需要用户交互）
document.addEventListener('DOMContentLoaded', function() {
    // 尝试自动播放（可能需要用户交互）
    const autoplay = () => {
        window.audioManager.playBackgroundMusic();
        document.removeEventListener('click', autoplay);
        document.removeEventListener('keydown', autoplay);
    };
    
    document.addEventListener('click', autoplay);
    document.addEventListener('keydown', autoplay);
});

// 导出音频管理器
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}