import '../styles/PlayerControls.css';

export default function PlayerControls({
  currentTime,
  duration,
  volume,
  isMuted,
  isCaptionsEnabled,
  hasCaptions,
  isVideoPlaying,
  isFullscreen,
  formatTime,
  onSeek,
  onVolume,
  onToggleMute,
  onToggleCaptions,
  onTogglePlay,
  onSkip,
  onToggleFullscreen,
}) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressStyle = {
    background: `linear-gradient(to right, #ff7a1a 0%, #ff7a1a ${progressPercent}%, rgba(255, 255, 255, 0.3) ${progressPercent}%, rgba(255, 255, 255, 0.3) 100%)`,
  };

  return (
    <div className="video-overlay-controls">
      <div className="video-progress-bar-wrap">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={onSeek}
          aria-label="Video progress"
          className="video-progress-bar"
          tabIndex={-1}
          onPointerUp={(event) => event.currentTarget.blur()}
          style={progressStyle}
        />
      </div>

      <div className="video-controls-row">
        <div className="video-controls-left">
          <button
            type="button"
            className="video-icon-button skip-button"
            onClick={() => onSkip(-10)}
            aria-label="Skip back 10 seconds"
            data-tooltip="Back"
          >
            ⏪
          </button>
          <button
            type="button"
            className="video-icon-button"
            onClick={onTogglePlay}
            aria-label={isVideoPlaying ? 'Pause' : 'Play'}
            data-tooltip={isVideoPlaying ? 'Pause' : 'Play'}
          >
            {isVideoPlaying ? '❚❚' : '▶'}
          </button>
          <button
            type="button"
            className="video-icon-button skip-button"
            onClick={() => onSkip(10)}
            aria-label="Skip forward 10 seconds"
            data-tooltip="Skip"
          >
            ⏩
          </button>
          <span className="video-time-readout">{formatTime(currentTime)}</span>
          <span className="video-time-divider">/</span>
          <span className="video-time-readout">{formatTime(duration)}</span>
        </div>

        <div className="video-controls-right">
          <button
            type="button"
            className="video-icon-button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            data-tooltip={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolume}
            aria-label="Volume"
            className="volume-slider"
          />
          <button
            type="button"
            className={`video-icon-button captions-button ${isCaptionsEnabled ? 'active' : ''}`}
            onClick={onToggleCaptions}
            aria-label={isCaptionsEnabled ? 'Turn subtitles off' : 'Turn subtitles on'}
            data-tooltip={hasCaptions ? (isCaptionsEnabled ? 'Subtitles off' : 'Subtitles') : 'Subtitles unavailable'}
            disabled={!hasCaptions}
          >
            CC
          </button>
          <button
            type="button"
            className="video-icon-button"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Exit' : 'Fullscreen'}
            data-tooltip={isFullscreen ? 'Exit' : 'Fullscreen'}
          >
            ⛶
          </button>
        </div>
      </div>

    </div>
  );
}
