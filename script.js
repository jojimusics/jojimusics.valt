// ===========================================
// CONSTANTES E VARIÁVEIS GLOBAIS
// ===========================================

// Elementos DOM
let currentTrackIndex = null;
let isPlaying = false;
let ambientTime = 0;

const modal = document.getElementById("audio-password-modal");
const confirmBtn = document.getElementById("confirm-audio");
const cancelBtn = document.getElementById("cancel-audio");
const closeBtn = document.getElementById("close-modal");

// 1️⃣ INPUT DA SENHA CORRIGIDO (OBRIGATÓRIO)
const modalPasswordInput = document.getElementById("modal-password-input");
const modalError = document.querySelector(".modal-error");

const player = document.getElementById("audio-player");
const playerAudio = document.getElementById("player-audio");

// ÁUDIO GLOBAL (atualizado)
const ambient = document.getElementById("ambient");
const spotifyAudio = new Audio();
spotifyAudio.preload = "auto";

const elements = {
    password: document.getElementById("password"),
    eye: document.getElementById("eye"),
    login: document.getElementById("login"),
    error: document.querySelector(".error"),
    ambient: document.getElementById("ambient"),
    
    // Telas
    loginScreen: document.getElementById("login-screen"),
    videoScreen: document.getElementById("video-screen"),
    folderScreen: document.getElementById("folder-screen"),
    albumScreen: document.getElementById("album-screen"),
    loginVideo: document.getElementById("login-video"),
    folderIcon: document.getElementById("folder-icon"),
    folderHoverBorder: document.getElementById("folder-hover-border"),
    
    // Letras
    lyricsText: document.getElementById("lyrics-text"),
    lyricsProgress: document.getElementById("lyrics-progress"),
    
    // Botões de letras
    lyricsBtns: document.querySelectorAll('.lyrics-btn'),
    
    // Álbum
    albumWindow: document.getElementById('album-window'),
    closeAlbumBtn: document.getElementById('close-album'),
    audioItems: document.querySelectorAll('.audio-item'),
    unlockedCount: document.getElementById('unlocked-count'),
    
    // Páginas das músicas
    musicPages: document.getElementById('music-pages'),
    slowDancingPage: document.getElementById('slow-dancing-page'),
    sanctuaryPage: document.getElementById('sanctuary-page'),
    dieForYouPage: document.getElementById('die-for-you-page'),
    pixelatedKissesPage: document.getElementById('pixelated-kisses-page'),
    
    // Back buttons
    backToAlbumBtns: document.querySelectorAll('.back-to-album-btn')
};

const albumAudios = {
    1: document.getElementById("album-audio-1"),
    2: document.getElementById("album-audio-2"),
    3: document.getElementById("album-audio-3"),
    4: document.getElementById("album-audio-4")
};

const audioPasswords = {
  1: "08209",
  2: "10157",
  3: "19217",
  4: "080226"
};

// ÁUDIOS DO FOLDER (COM SENHA)
const albumTracks = {
  1: "demais/AUDIO 1 .mp3",
  2: "demais/AUDIO 2 .mp3",
  3: "demais/AUDIO 3.mp3",
  4: "demais/AUDIO 4.ogg"
};

// Variáveis para controle do álbum
let unlocked = 1;
let pendingAlbumAudio = null;
let currentAlbumAudio = null;
let albumPlayer = new Audio();
let albumPlaying = false;

/* ===========================================
   PLAYLIST ATUALIZADA
=========================================== */

const playlist = [
  {
    id: "slow-dancing",
    title: "Slow Dancing in the Dark",
    audio: "demais/SLOW DANCING IN THE DARK - Joji (youtube).mp3",
    page: "slow-dancing-page"
  },
  {
    id: "sanctuary",
    title: "Sanctuary",
    audio: "demais/Joji - Sanctuary (Official Video) - 88rising (youtube).mp3",
    page: "sanctuary-page"
  },
  {
    id: "die-for-you",
    title: "Die For You",
    audio: "demais/Joji - Die For You - Joji (youtube).mp3",
    page: "die-for-you-page"
  },
  {
    id: "pixelated-kisses",
    title: "Pixelated Kisses",
    audio: "demais/PIXELATED KISSES - Joji (youtube).mp3",
    page: "pixelated-kisses-page"
  }
];

const musicButtons = {
  "Slow Dancing in the Dark": 0,
  "Sanctuary": 1,
  "Die For You": 2,
  "Pixelated Kisses": 3
};

// Variáveis de estado
const state = {
    hasAttemptedPlay: false,
    lyricsInterval: null,
    currentLyricIndex: 0,
    isLyricsActive: false,
    errorThemeActive: false,
    currentAlbumAudio: 1,
    unlockedAudios: new Set([1]),
    listeningProgress: {
        1: { listened: false, currentTime: 0, duration: 0 },
        2: { listened: false, currentTime: 0, duration: 0 },
        3: { listened: false, currentTime: 0, duration: 0 },
        4: { listened: false, currentTime: 0, duration: 0 }
    }
};

// Letras da música ambiente (mantidas do código original)
const lyrics = [
    { text: "Lately", time: 14, duration: 3.3 },
    { text: "I can't help but think that our roads might take us down different phases", time: 15, duration: 9 },
    { text: "Don't wanna complicate the rhythm that we got but I'm speechless", time: 19, duration: 11 },
    { text: "When everything's so pure, can it be aimless?", time: 32, duration: 5.5 },
    { text: "Painless?", time: 35, duration: 6.8 },
    { text: "If you ever go", time: 40, duration: 5 },
    { text: "All the songs that we like", time: 45, duration: 4 },
    { text: "Will sound like bittersweet lullabies", time: 50, duration: 5 },
    { text: "Lost in the blue", time: 57, duration: 3 },
    { text: "They don't love me like you do", time: 60, duration: 4 },
    { text: "Those chills that I knew", time: 64, duration: 3 },
    { text: "They were nothing without you", time: 66, duration: 3 },
    { text: "And", time: 70, duration: 2 },
    { text: "everyone else", time: 71.5, duration: 3 },
    { text: "They don't matter now", time: 73, duration: 3 },
    { text: "You're the one I can't lose", time: 77, duration: 3 },
    { text: "No one loves me like you do", time: 83, duration: 5 },
    { text: "Since I met you", time: 89, duration: 3 },
    { text: "All the gloomy days just seem to shine a little more brightly", time: 96, duration: 7 },
    { text: "Consider what we've got 'cause I can never take you for granted", time: 103, duration: 7 },
    { text: "Is there another us on this whole planet?", time: 106, duration: 6 },
    { text: "Planet?", time: 115, duration: 3 },
    { text: "If you ever go", time: 120, duration: 4 },
    { text: "All the songs that we like", time: 124, duration: 4 },
    { text: "Will sound like bittersweet lullabies", time: 128, duration: 5 },
    { text: "Lost in the blue", time: 137, duration: 3 },
    { text: "They don't love me like you do", time: 139, duration: 4 },
    { text: "Those chills that I knew", time: 143, duration: 3 },
    { text: "They were nothing without you", time: 146, duration: 4 },
    { text: "And", time: 150, duration: 2 },
    { text: "Everyone else", time: 151, duration: 3 },
    { text: "They don't matter now", time: 155, duration: 3 },
    { text: "You're the one I can't lose", time: 158, duration: 4 },
    { text: "No one loves me like you do", time: 163, duration: 4 },
    { text: "No one loves me like you do", time: 173, duration: 4 },
    { text: "I don't wanna seem foolish", time: 177, duration: 4 },
    { text: "When I'm jumping into this", time: 180, duration: 4 },
    { text: "You're all that I see", time: 185, duration: 3 },
    { text: "Lost in the blue", time: 193, duration: 3 },
    { text: "They don't love me like you do", time: 197, duration: 4 },
    { text: "Those chills that I knew", time: 200, duration: 3 },
    { text: "They were nothing without you", time: 203, duration: 4 },
    { text: "And everyone else", time: 207, duration: 3 },
    { text: "They don't matter now", time: 210, duration: 3 },
    { text: "You're the one I can't lose", time: 214, duration: 4 },
    { text: "No one loves me like you do", time: 215, duration: 4 },
    { text: "No one loves me like you do.", time: 217, duration: 4 },
    { text: "No one loves me like you do..", time: 219, duration: 4 },
    { text: "No one loves me like you do...", time: 222, duration: 4 }
];

// Letras das músicas (mantidas do código original)
const songLyrics = {
    'Slow Dancing in the Dark': `
    I don't want a friend (just me)
I want my life in two (my life in two)
Just one more night
Waiting to get there
Waiting for you (all night)
I'm done fighting all night (waiting for you)
When I'm around slow dancing in the dark
Don't follow me, you'll end up in my arms
You have made up your mind
I don't need no more signs
Can you?
Can you?
Give me reasons we should be complete
You should be with him, I can't compete
You looked at me like I was someone else, oh well
Can't you see? (Can't you see?)
I don't wanna slow dance (I don't want to slow dance)
In the dark
Dark
When you gotta run
Just hear my voice in you (my voice in you)
Shutting me out of you (shutting me out of you)
Doing so great (so great, so great)
You
Used to be the one (used to be the one)
To hold you when you fall
Yeah, yeah, yeah (when you fall, when you fall)
I don't fuck with your tone (I don't fuck with your tone)
I don't wanna go home (I don't wanna go home)
Can it be one night?
Can you?
Can you?
Give me reasons we should be complete
You should be with him, I can't compete
You looked at me like I was someone else, oh well
Can't you see?
I don't wanna slow dance (I don't want to slow dance)
In the dark
Dark
In the dark
Dark`,

    'Sanctuary': `
    Go ahead and bark after dark
Fallen star, I'm your one call away
Motel halls, neon walls
When night falls, I am your escape
When you lay alone, I ache
Something I wanted to feel
If you've been waiting for fallin' in love
Babe, you don't have to wait on me
'Cause I've been aiming for heaven above
But an angel ain't what I need
Not anyone, you're the one
More than fun, you're the sanctuary
'Cause what you want is what I want
Sincerity
Souls that dream alone lie awake
I'll give you something so real
If you've been waiting for fallin' in love
Babe, you don't have to wait on me
'Cause I've been aiming for heaven above
But an angel ain't what I need
Pull me, oh, so close
'Cause you never know
Just how long our lives will be
If you've been waiting for fallin' in love
Babe, you don't have to wait on me
'Cause I've been aiming for heaven above
But an angel ain't what I need`,

    'Die For You': `
    Swear I couldn't sleep a wink last night
No point in turnin' off the lights
Not the same without your head on my shoulders
Growin' pains, but I don't wanna get older
Almost like we left it all on read
Couple feelings never laid to rest
Didn't know that the party was over
And it's true that I need you here closer
Burning photos
Had to learn to let go
I used to be
Somebody in another skin (another skin)
I heard that you're happy without me
And I hope it's true
(I hope, I hope it's true)
It kills me a little, that's okay
'Cause I'd die for you
You know I'd still die for you
I hope you're getting everything you needed (needed)
Found the puzzle piece and feel completed (completed)
Just wanted you to know every reason
Hope you really know that I mean that
I couldn't see
The forest from the trees
Only time we speak
Is in my dreams
Burning photos
Had to learn to let go
I used to be
Somebody in another skin (another skin)
I heard that you're happy without me
And I hope it's true
(I hope, I hope it's true)
It kills me a little, that's okay
'Cause I'd die for you
You know I'd still die for you`,

    'Pixelated Kisses': `
    Pixelated kisses got me goin' insane
Replicate this moment from a million miles away
Waiting for the signal, baby, never make a sound
If you never hear from me, all the satellites are down
Yeah, they're all fuckin' down

Falling through the atmosphere right now
Baby, are you really down?
Baby, are you really down?
(Ooh-ooh-ooh-ooh)

Pixelated kisses got me goin' insane
Replicate this moment from a million miles away
Waiting for the signal, baby, never make a sound
If you never hear from me, all the satellites are down
Yeah, they're all fuckin' down

Falling through the atmosphere right now
Baby, are you really down?
Baby, are you really down?
(Ooh-ooh-ooh-ooh)`
};

// ===========================================
// FUNÇÕES UTILITÁRIAS
// ===========================================

function toggleErrorTheme() {
    state.errorThemeActive = !state.errorThemeActive;
    
    if (state.errorThemeActive) {
        document.body.classList.add("error-theme");
        elements.loginScreen.classList.add("error-theme");
        
        document.documentElement.style.setProperty('--main-color', '#7fd1c9');
        document.documentElement.style.setProperty('--bg-color', '#081418');
        document.documentElement.style.setProperty('--text-color', '#9fe0d7');
        document.documentElement.style.setProperty('--accent-opacity', '0.25');
        
        updateEyeIcons('#9fe0d7');
        
        elements.lyricsBtns.forEach(btn => {
            btn.classList.remove("hidden");
            btn.style.opacity = "1";
        });
    } else {
        document.body.classList.remove("error-theme");
        elements.loginScreen.classList.remove("error-theme");
        
        document.documentElement.style.setProperty('--main-color', '#640b0b');
        document.documentElement.style.setProperty('--bg-color', 'black');
        document.documentElement.style.setProperty('--text-color', '#640b0b');
        document.documentElement.style.setProperty('--accent-opacity', '0.1');
        
        updateEyeIcons('#640b0b');
        
        elements.lyricsBtns.forEach(btn => {
            btn.classList.add("hidden");
        });
    }
}

function initializeCSSVariables() {
    document.documentElement.style.setProperty('--main-color', '#640b0b');
    document.documentElement.style.setProperty('--bg-color', 'black');
    document.documentElement.style.setProperty('--text-color', '#640b0b');
    document.documentElement.style.setProperty('--accent-opacity', '0.1');
    updateEyeIcons('#640b0b');
}

function toggleElement(element, show) {
    if (show) {
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('visible');
        }, 10);
    } else {
        element.classList.remove('visible');
        setTimeout(() => {
            element.classList.add('hidden');
        }, 300);
    }
}

// ===========================================
// SISTEMA DE ÁUDIO AMBIENTE
// ===========================================

function initAmbientMusic() {
    ambient.volume = 0.15;
    ambient.loop = true;
    
    const playAmbient = () => {
        ambient.play().then(() => {
            console.log("Áudio ambiente iniciado automaticamente");
            startLyrics();
        }).catch(error => {
            console.log("Autoplay bloqueado. Clique para iniciar.");
            document.addEventListener('click', function firstClick() {
                ambient.play().then(() => {
                    startLyrics();
                });
                document.removeEventListener('click', firstClick);
            }, { once: true });
        });
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', playAmbient);
    } else {
        playAmbient();
    }
}

function startLyrics() {
    if (state.isLyricsActive) return;
    
    state.isLyricsActive = true;
    state.currentLyricIndex = 0;
    
    elements.lyricsText.classList.add("visible");
    updateLyrics();
    state.lyricsInterval = setInterval(updateLyrics, 100);
}

function stopLyrics() {
    state.isLyricsActive = false;
    clearInterval(state.lyricsInterval);
    elements.lyricsText.classList.remove("visible");
    elements.lyricsText.classList.remove("fade-in");
    elements.lyricsText.textContent = "";
    elements.lyricsProgress.style.width = "0%";
}

function backToAlbum() {
  // Para a música do spotify
  spotifyAudio.pause();
  spotifyAudio.currentTime = 0;
  isPlaying = false;

  updatePlayButtons();

  // Esconde todas as páginas de música
  document.querySelectorAll(".music-page").forEach(page => {
    page.classList.remove("active");
    page.classList.add("hidden");
  });

  // Volta a música ambiente
  ambient.play().catch(() => {});
}

function updateLyrics() {
    if (!ambient || !ambient.currentTime) return;
    
    const currentTime = ambient.currentTime;
    const totalDuration = ambient.duration || 180;
    const progressPercent = (currentTime / totalDuration) * 100;
    
    if (elements.lyricsProgress) {
        elements.lyricsProgress.style.width = `${progressPercent}%`;
    }
    
    let foundLyric = null;
    
    for (let i = state.currentLyricIndex; i < lyrics.length; i++) {
        const lyric = lyrics[i];
        if (currentTime >= lyric.time && currentTime < lyric.time + lyric.duration) {
            foundLyric = lyric;
            state.currentLyricIndex = i;
            break;
        }
    }
    
    if (!foundLyric) {
        for (let i = 0; i < state.currentLyricIndex; i++) {
            const lyric = lyrics[i];
            if (currentTime >= lyric.time && currentTime < lyric.time + lyric.duration) {
                foundLyric = lyric;
                state.currentLyricIndex = i;
                break;
            }
        }
    }
    
    if (foundLyric && elements.lyricsText && elements.lyricsText.textContent !== foundLyric.text) {
        elements.lyricsText.classList.remove("fade-in");
        
        setTimeout(() => {
            elements.lyricsText.textContent = foundLyric.text;
            elements.lyricsText.classList.add("fade-in");
        }, 300);
    }
}

// ===========================================
// SISTEMA DE LOGIN
// ===========================================

function handleLogin() {
    if (elements.password.value !== "01022007") {
        toggleErrorTheme();
        
        if (elements.error) {
            elements.error.classList.remove("hidden");
            elements.error.classList.add("pulse");
        }
        
        elements.password.value = "";
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    } else {
        stopLyrics();
        if (elements.loginScreen) {
            elements.loginScreen.classList.add("hidden");
        }
        if (elements.videoScreen) {
            elements.videoScreen.classList.remove("hidden");
        }
        
        if (elements.loginVideo) {
            elements.loginVideo.loop = false;
            elements.loginVideo.volume = 1.0;
            ambient.pause();
            
            elements.loginVideo.play().catch(error => {
                console.log("Erro ao reproduzir vídeo:", error);
                if (elements.videoScreen) {
                    elements.videoScreen.classList.add("hidden");
                }
                if (elements.folderScreen) {
                    elements.folderScreen.classList.remove("hidden");
                }
            });
        }
    }
}

// ===========================================
// SISTEMA DE OLHO DA SENHA
// ===========================================

function updateEyeIcons(color) {
    const eyeIcons = document.querySelectorAll('.eye-icon');
    eyeIcons.forEach(icon => {
        if (color === '#9fe0d7') {
            icon.style.filter = 'invert(80%) sepia(23%) saturate(412%) hue-rotate(128deg) brightness(94%) contrast(88%)';
        } else {
            icon.style.filter = 'invert(11%) sepia(86%) saturate(3737%) hue-rotate(351deg) brightness(85%) contrast(101%)';
        }
    });
}

function togglePasswordVisibility() {
    if (!elements.password || !elements.eye) return;
    
    const isPassword = elements.password.type === 'password';
    elements.password.type = isPassword ? 'text' : 'password';
    
    if (isPassword) {
        elements.eye.src = 'demais/passwordEyeOpen.svg';
    } else {
        elements.eye.src = 'demais/passwordEyeClose.svg';
    }
}

// ===========================================
// SISTEMA DE ÁLBUM
// ===========================================

function showAlbumScreen() {
    elements.albumScreen.classList.remove("hidden");
    elements.albumScreen.classList.add("fade-scale");
    
    requestAnimationFrame(() => {
        elements.albumScreen.classList.add("visible");
    });
    
    setTimeout(() => {
        elements.albumWindow.classList.remove("hidden");
        elements.albumWindow.classList.add("fade-scale");
        
        requestAnimationFrame(() => {
            elements.albumWindow.classList.add("visible");
        });
        
        updateAlbumDisplay();
    }, 100);
}

function hideAlbumScreen() {
    elements.albumWindow.classList.remove("visible");
    elements.albumScreen.classList.remove("visible");
    
    setTimeout(() => {
        elements.albumWindow.classList.add("hidden");
        elements.albumScreen.classList.add("hidden");
    }, 600);
}

function updateAlbumDisplay() {
    if (elements.unlockedCount) {
        elements.unlockedCount.textContent = unlocked;
    }
    
    if (elements.audioItems) {
        elements.audioItems.forEach(item => {
            const audioNum = parseInt(item.getAttribute('data-audio'));
            if (audioNum <= unlocked) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    }
}

// ===========================================
// FUNÇÕES DO MODAL DE SENHA DOS ÁUDIOS
// ===========================================

// 2️⃣ USE UMA ÚNICA FUNÇÃO PARA CONFIRMAR A SENHA
function openAudioPasswordModal(audioNum) {
  pendingAlbumAudio = audioNum;
  modal.classList.remove("hidden");
  modalPasswordInput.value = "";
  modalError.classList.add("hidden");
}

function closeAudioPasswordModal() {
    modal.classList.add("hidden");
    modalPasswordInput.value = "";
    
    if (modalError) {
        modalError.classList.add("hidden");
    }
    modalPasswordInput.classList.remove("shake");
}

// ===========================================
// LÓGICA DE DESBLOQUEIO DE ÁUDIOS
// ===========================================

function showNextAudio() {
    if (unlocked < 4) {
        unlocked++;
        const nextItem = document.querySelector(
            `.audio-item[data-audio="${unlocked}"]`
        );
        if (nextItem) {
            nextItem.classList.remove("hidden");
            nextItem.classList.add("visible");
        }

        if (elements.unlockedCount) {
            elements.unlockedCount.textContent = unlocked;
        }
        
        if (unlocked === 4) {
            startGlitchEffect();
        }
    }
}

// ===========================================
// SISTEMA DE GLITCH PARA AUDIO 4
// ===========================================

function startGlitchEffect() {
    const audio4Item = document.querySelector('.audio-item[data-audio="4"]');
    if (!audio4Item) return;
    
    audio4Item.classList.add('glitch-active');
    
    const glitchInterval = setInterval(() => {
        const glitchElements = audio4Item.querySelectorAll('.glitch-effect');
        glitchElements.forEach(el => {
            if (Math.random() > 0.7) {
                el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                el.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
                el.style.textShadow = `0 0 10px hsl(${Math.random() * 360}, 100%, 50%)`;
            } else {
                el.style.transform = 'translate(0, 0)';
                el.style.color = '';
                el.style.textShadow = '';
            }
        });
    }, 100);
}

// ===========================================
// SISTEMA DE ÁUDIO DO ÁLBUM
// ===========================================

function stopAllAlbumAudios() {
    Object.values(albumAudios).forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

function checkAudioCompletion(audioNum) {
    const audio = albumAudios[audioNum];
    if (!audio) return;

    if (audio.currentTime >= audio.duration * 0.95) {
        const next = audioNum + 1;

        if (next <= 4 && !state.unlockedAudios.has(next)) {
            state.unlockedAudios.add(next);
            updateAlbumDisplay();

            if (next === 4) {
                triggerFinalAudioEvent();
            }
        }
    }
}

function triggerFinalAudioEvent() {
    console.log("ÁUDIO 4 DESBLOQUEADO");
    document.body.classList.add("final-stage");
}

/* ===========================================
   ABRIR PÁGINA DA MÚSICA (ATUALIZADO)
=========================================== */

function openMusicPage(index) {
  currentTrackIndex = index;

  document.querySelectorAll(".music-page").forEach(p => {
    p.classList.remove("active");
    p.classList.add("hidden");
  });

  const page = document.getElementById(playlist[index].page);
  if (page) {
    page.classList.remove("hidden");

    requestAnimationFrame(() => {
      page.classList.add("active");
    });
  }

  loadTrack(index);
}

/* ===========================================
   CONTROLE DE FAIXA (ATUALIZADO)
=========================================== */

function loadTrack(index) {
  spotifyAudio.src = playlist[index].audio;
  spotifyAudio.load();
  isPlaying = false;
  updatePlayButtons();
}

function togglePlay() {
  if (currentTrackIndex === null) return;

  if (!isPlaying) {
    ambient.pause();
    spotifyAudio.play();
    isPlaying = true;
  } else {
    spotifyAudio.pause();
    isPlaying = false;
  }

  updatePlayButtons();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  openMusicPage(currentTrackIndex);
  spotifyAudio.play();
  isPlaying = true;
  updatePlayButtons();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  openMusicPage(currentTrackIndex);
  spotifyAudio.play();
  isPlaying = true;
  updatePlayButtons();
}

function updatePlayButtons() {
  document.querySelectorAll(".control-btn.play-pause")
    .forEach(btn => {
      btn.textContent = isPlaying ? "⏸" : "▶";
    });
}

/* ===============================
   MINI PLAYER
================================ */
function openMiniPlayer(num) {
  currentAlbumAudio = num;
  albumPlayer.src = albumTracks[num];
  albumPlayer.load();

  document.getElementById("mini-title").innerText = `AUDIO ${num}`;

  document.getElementById("mini-player").classList.remove("hidden");

  albumPlaying = false;
  updateMiniUI();
  
  // Adicione AQUI o evento de término da música
  albumPlayer.addEventListener("ended", () => {
    unlockNextAudio(currentAlbumAudio);
  });
}

function toggleMiniPlay() {
  if (!albumPlaying) {
    albumPlayer.play();
    albumPlaying = true;

    // 🔮 ATIVA MODO ROXO SE FOR AUDIO 4
    if (currentAlbumAudio === 4) {
      document.body.classList.add("purple-mode");
    }
  } else {
    albumPlayer.pause();
    albumPlaying = false;

    // remove roxo ao pausar
    document.body.classList.remove("purple-mode");
  }

  updateMiniUI();
}


function updateMiniUI() {
  document.getElementById("mini-play").innerText = albumPlaying ? "⏸" : "▶";
}

// ===========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ===========================================

function setupEventListeners() {
    // Login
    if (elements.login) {
        elements.login.addEventListener("click", handleLogin);
    }
    
    if (elements.password) {
        elements.password.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleLogin();
        });
    }
    
    // Olho da senha
    if (elements.eye) {
        elements.eye.addEventListener("click", togglePasswordVisibility);
    }
    
    // 3️⃣ FUNÇÃO FINAL DE CONFIRMAÇÃO (ESSA FUNCIONA)
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
          if (!pendingAlbumAudio) return;

          const input = modalPasswordInput.value.trim();

          if (input === audioPasswords[pendingAlbumAudio]) {
            closeAudioPasswordModal();
            openMiniPlayer(pendingAlbumAudio);
          } else {
            modalError.classList.remove("hidden");
            modalPasswordInput.classList.add("shake");

            setTimeout(() => {
              modalPasswordInput.classList.remove("shake");
            }, 400);
          }
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener("click", closeAudioPasswordModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closeAudioPasswordModal);
    }
    
    if (modalPasswordInput) {
        modalPasswordInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                confirmBtn.click();
            }
        });
    }
    
    if (modal) {
        modal.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeAudioPasswordModal();
            }
        });
    }
    
    // 4️⃣ GARANTA QUE O CLIQUE NO ÁUDIO CHAME O MODAL CERTO
    document.querySelectorAll(".audio-item").forEach(item => {
      item.addEventListener("click", () => {
        const num = Number(item.dataset.audio);
        openAudioPasswordModal(num);
      });
    });
    
    if (elements.closeAlbumBtn) {
        elements.closeAlbumBtn.addEventListener("click", hideAlbumScreen);
    }
    
    // Botão de voltar das músicas
    if (elements.backToAlbumBtns) {
        elements.backToAlbumBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                backToAlbum();
            });
        });
    }
    
    // Vídeo de login
    if (elements.loginVideo) {
        elements.loginVideo.addEventListener("ended", () => {
            if (elements.videoScreen) {
                elements.videoScreen.classList.add("hidden");
            }
            if (elements.folderScreen) {
                elements.folderScreen.classList.remove("hidden");
            }
        });
    }
    
    // Ícone da pasta
    if (elements.folderIcon) {
        elements.folderIcon.addEventListener("click", showAlbumScreen);
    }
    
    // Botões de letras
    if (elements.lyricsBtns) {
        elements.lyricsBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                openMusicPage(index);
            });
        });
    }
    
    // Player close button
    const closePlayerBtn = document.getElementById("close-player");
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener("click", () => {
            if (player) player.classList.add("hidden");
            if (playerAudio) {
                playerAudio.pause();
                playerAudio.currentTime = 0;
            }
        });
    }
    
    // Monitora conclusão de áudios
    Object.keys(albumAudios).forEach((key) => {
        if (albumAudios[key]) {
            albumAudios[key].addEventListener("timeupdate", () => {
                checkAudioCompletion(parseInt(key));
            });
            
            albumAudios[key].addEventListener("ended", () => {
                if (parseInt(key) === unlocked && unlocked < 4) {
                    showNextAudio();
                }
            });
        }
    });

    // Controles do player Spotify
    document.querySelectorAll(".control-btn.play-pause")
        .forEach(btn => btn.addEventListener("click", togglePlay));

    document.querySelectorAll(".control-btn.next")
        .forEach(btn => btn.addEventListener("click", nextTrack));

    document.querySelectorAll(".control-btn.prev")
        .forEach(btn => btn.addEventListener("click", prevTrack));

    // Controles do mini player
    document.getElementById("mini-play")
      .addEventListener("click", toggleMiniPlay);

    document.getElementById("mini-close")
      .addEventListener("click", () => {
        albumPlayer.pause();
        albumPlayer.currentTime = 0;
        albumPlaying = false;
        document.getElementById("mini-player")
          .classList.add("hidden");
      });
}

// ===========================================
// INICIALIZAÇÃO
// ===========================================

function init() {
    initializeCSSVariables();
    setupEventListeners();
    initAmbientMusic();
    
    // Carrega as letras nas páginas
    if (songLyrics['Slow Dancing in the Dark']) {
        const slowLyricsEl = document.getElementById('slow-dancing-lyrics');
        if (slowLyricsEl) {
            slowLyricsEl.textContent = songLyrics['Slow Dancing in the Dark'];
        }
    }
    
    if (songLyrics['Sanctuary']) {
        const sanctuaryLyricsEl = document.getElementById('sanctuary-lyrics');
        if (sanctuaryLyricsEl) {
            sanctuaryLyricsEl.textContent = songLyrics['Sanctuary'];
        }
    }
    
    if (songLyrics['Die For You']) {
        const dieForYouLyricsEl = document.getElementById('die-for-you-lyrics');
        if (dieForYouLyricsEl) {
            dieForYouLyricsEl.textContent = songLyrics['Die For You'];
        }
    }
    
    if (songLyrics['Pixelated Kisses']) {
        const pixelatedLyricsEl = document.getElementById('pixelated-lyrics');
        if (pixelatedLyricsEl) {
            pixelatedLyricsEl.textContent = songLyrics['Pixelated Kisses'];
        }
    }
    
    // Atualiza contador inicial
    if (elements.unlockedCount) {
        elements.unlockedCount.textContent = unlocked;
    }
    
    console.log("Sistema JOJI inicializado com sucesso!");
}

// Inicializa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function unlockNextAudio(currentNum) {
  const next = document.querySelector(
    `.audio-item[data-audio="${currentNum + 1}"]`
  );

  if (!next) return;

  next.classList.remove("hidden", "locked");
  next.classList.add("unlocked");
}
