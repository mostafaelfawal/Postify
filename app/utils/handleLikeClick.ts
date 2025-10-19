let audio: HTMLAudioElement | null = null;

export default function handleLikeClick() {
  if (!audio) {
    audio = new Audio("/sounds/like.wav");
  }

  // لو الصوت بيشتغل بالفعل، نرجعه للبداية
  audio.currentTime = 0;
  audio.play();
}
