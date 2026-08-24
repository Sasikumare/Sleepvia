import { useEffect, useMemo, useRef, useState } from 'react';
import MovieHeader from '../components/MovieHeader';
import MovieGrid from '../components/MovieGrid';
import MovieSidebar from '../components/MovieSidebar';
import Footer from '../components/Footer';
import PlayerControls from '../components/PlayerControls';
import '../styles/MoviePage.css';

const MOVIES_PER_PAGE = 8;

const movieData = {
  TELUGU: [
    {
      title: 'Lenin (2026) 1080p Telugu HD',
      year: 'Telugu',
      image: 'https://storage.googleapis.com/sleepvia-images-20260703/Lenin_poster.jpg',
    },
    { title: 'Magudam (2026) DVDScr Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Magudam+Telugu' },
    { title: "I'm Game (2026) DVDScr Telugu", year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Im+Game' },
    { title: 'Vadala (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Vadala' },
    { title: 'Vishwanath and Sons (2026) DVDScr Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Vishwanath' },
    { title: 'Mr. Work from Home (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Mr+Work' },
    { title: 'Achyuta Avataram (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Achyuta' },
    { title: 'The Legend of Karna Season 1 (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Legend+Karna' },
    { title: 'Korean Kanakaraju (2026) DVDScr Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Korean+Kana' },
    { title: 'Mystery House (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Mystery+House' },
    { title: 'Shadow Valley (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Shadow+Valley' },
    { title: 'Midnight Ride (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Midnight+Ride' },
    { title: 'The Last Signal (2026) Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Last+Signal' },
  ],
  TAMIL: [
    { title: 'Magudam (2026) DVDScr Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Magudam+Tamil' },
    { title: 'Dark Face (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Dark+Face' },
    { title: 'Vishwanath and Sons (2026) DVDScr Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Vishwanath+T' },
    { title: 'Heartin (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Heartin' },
    { title: 'The Final Bell (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Final+Bell' },
    { title: 'Fireline (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Fireline' },
    { title: 'Second Chance (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Second+Chance' },
    { title: 'Night Watch (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Night+Watch' },
    { title: 'Skyline (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Skyline' },
    { title: 'River of Dust (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=River+of+Dust' },
  ],
  BOLLYWOOD: [
    { title: 'Bollywood Movie 1 (2026)', year: 'Bollywood', image: 'https://via.placeholder.com/180x280?text=Bollywood+1' },
    { title: 'Bollywood Movie 2 (2026)', year: 'Bollywood', image: 'https://via.placeholder.com/180x280?text=Bollywood+2' },
    { title: 'Bollywood Movie 3 (2026)', year: 'Bollywood', image: 'https://via.placeholder.com/180x280?text=Bollywood+3' },
    { title: 'Bollywood Movie 4 (2026)', year: 'Bollywood', image: 'https://via.placeholder.com/180x280?text=Bollywood+4' },
    { title: 'Bollywood Movie 5 (2026)', year: 'Bollywood', image: 'https://via.placeholder.com/180x280?text=Bollywood+5' },
  ],
  MALAYALAM: [
    { title: 'Malayalam Movie 1 (2026)', year: 'Malayalam', image: 'https://via.placeholder.com/180x280?text=Malayalam+1' },
    { title: 'Malayalam Movie 2 (2026)', year: 'Malayalam', image: 'https://via.placeholder.com/180x280?text=Malayalam+2' },
    { title: 'Malayalam Movie 3 (2026)', year: 'Malayalam', image: 'https://via.placeholder.com/180x280?text=Malayalam+3' },
    { title: 'Malayalam Movie 4 (2026)', year: 'Malayalam', image: 'https://via.placeholder.com/180x280?text=Malayalam+4' },
    { title: 'Malayalam Movie 5 (2026)', year: 'Malayalam', image: 'https://via.placeholder.com/180x280?text=Malayalam+5' },
  ],
  HOLLYWOOD: [
    { title: 'Hollywood Movie 1 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+1' },
    { title: 'Hollywood Movie 2 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+2' },
    { title: 'Hollywood Movie 3 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+3' },
    { title: 'Hollywood Movie 4 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+4' },
    { title: 'Hollywood Movie 5 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+5' },
    { title: 'Hollywood Movie 6 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+6' },
    { title: 'Hollywood Movie 7 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+7' },
    { title: 'Hollywood Movie 8 (2026)', year: 'Hollywood', image: 'https://via.placeholder.com/180x280?text=Hollywood+8' },
  ],
  OTHERS: [
    { title: 'Other Movie 1 (2026)', year: 'Other', image: 'https://via.placeholder.com/180x280?text=Other+1' },
    { title: 'Other Movie 2 (2026)', year: 'Other', image: 'https://via.placeholder.com/180x280?text=Other+2' },
    { title: 'Other Movie 3 (2026)', year: 'Other', image: 'https://via.placeholder.com/180x280?text=Other+3' },
    { title: 'Other Movie 4 (2026)', year: 'Other', image: 'https://via.placeholder.com/180x280?text=Other+4' },
    { title: 'Other Movie 5 (2026)', year: 'Other', image: 'https://via.placeholder.com/180x280?text=Other+5' },
  ],
};

const recentMoviesList = [
  {
    title: 'Lenin (2026) 1080p Telugu HQ WEB-DL',
    year: 'Telugu',
    image: 'https://storage.googleapis.com/sleepvia-images-20260703/Lenin_poster.jpg',
  },
  { title: 'Magudam (2026) DVDScr Telugu', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Magudam+Telugu' },
  { title: 'Magudam (2026) DVDScr Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Magudam+Tamil' },
  { title: 'Vishwanath And Sons (2026) DVDScr Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Vishwanath+T' },
  { title: 'Euphoria (2026) Hindi', year: 'Hindi', image: 'https://via.placeholder.com/180x280?text=Euphoria' },
  { title: 'Mas Inti Bangaram (2026) Hindi', year: 'Hindi', image: 'https://via.placeholder.com/180x280?text=Mas+Inti' },
  { title: "I'm Game (2026) DVDScr Telugu", year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Im+Game' },
  { title: 'To the Max (2026) Telugu Dubbed', year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=To+the+Max' },
  { title: "Don't Say Good Luck (2026) Telugu Dubbed", year: 'Telugu', image: 'https://via.placeholder.com/180x280?text=Good+Luck' },
  { title: 'Dark Face (2026) Tamil', year: 'Tamil', image: 'https://via.placeholder.com/180x280?text=Dark+Face' },
];

// generate extra test movies so pagination can be exercised
(() => {
  const targetTotal = 200; // aim for ~200 movies across categories
  const cats = Object.keys(movieData);

  const currentCount = () => Object.values(movieData).reduce((s, arr) => s + arr.length, 0);

  while (currentCount() < targetTotal) {
    for (const cat of cats) {
      const idx = currentCount() + 1;
      movieData[cat].push({
        title: `Test Movie ${idx} (2026) ${cat}`,
        year: cat,
        image: `https://via.placeholder.com/180x280?text=Test+${idx}`,
      });
      if (currentCount() >= targetTotal) break;
    }
  }
})();

const PREVIEW_VIDEO_URL = 'https://storage.googleapis.com/sleepvia-images-20260703/Lenin%20(2026)%201080p%20Telugu%20HQ%20WEB-DL%20-%20AVC%20-%20(DD+5.1%20-%20192kbps%20%26%20AAC)%20-%202.7GB%20-%20ESub.mkv';

export default function MoviePage() {
  const videoRef = useRef(null);
  const previewBoxRef = useRef(null);
  const hideControlsTimerRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState('TELUGU');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allMovies = useMemo(
    () => Object.values(movieData).flat(),
    []
  );

  const displayMovies = useMemo(
    () => {
      if (currentCategory === 'HOME') {
        return allMovies;
      }

      return movieData[currentCategory] || movieData.TELUGU;
    },
    [allMovies, currentCategory]
  );

  const filteredMovies = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return displayMovies;
    }

    const sourceMovies = allMovies;

    return sourceMovies.filter((movie) =>
      movie.title.toLowerCase().includes(normalizedQuery)
    );
  }, [allMovies, displayMovies, searchQuery]);

  const activeCategoryLabel = searchQuery ? 'Search Results' : currentCategory;

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
    setIsVideoPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCategory, searchQuery]);

  useEffect(() => {
    setIsVideoPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedMovie]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchQuery('');
    setSelectedMovie(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setSelectedMovie(null);
  };

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const formatTime = (timeValue) => {
    if (!Number.isFinite(timeValue) || timeValue < 0) {
      return '0:00';
    }

    const totalSeconds = Math.floor(timeValue);

    if (totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onTimeUpdate = () => setCurrentTime(video.currentTime || 0);
    const onPlay = () => setIsVideoPlaying(true);
    const onPause = () => {
      setIsVideoPlaying(false);
      setIsControlsVisible(true);
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    };
    const onEnded = () => setIsVideoPlaying(false);

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [selectedMovie]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted, selectedMovie]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video?.textTracks) return;

    Array.from(video.textTracks).forEach((track) => {
      track.mode = isCaptionsEnabled ? 'showing' : 'hidden';
    });
  }, [isCaptionsEnabled, selectedMovie]);

  useEffect(() => {
    if (!selectedMovie || isVideoPlaying) return;

    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current);
    }
    setIsControlsVisible(true);
  }, [selectedMovie, isVideoPlaying]);

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) {
      setHasStarted(true);
      requestAnimationFrame(() => {
        const nextVideo = videoRef.current;
        if (!nextVideo) return;

        nextVideo.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(() => {
          setIsVideoPlaying(false);
        });
      });
      return;
    }

    if (video.paused) {
      setHasStarted(true);
      try {
        await video.play();
        setIsVideoPlaying(true);
      } catch (error) {
        setIsVideoPlaying(false);
      }
      return;
    }

    video.pause();
    setIsVideoPlaying(false);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolume = (event) => {
    const nextVolume = Number(event.target.value);
    const video = videoRef.current;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (video) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;
    setVolume(nextMuted ? 0 : 0.7);
    video.volume = nextMuted ? 0 : 0.7;
  };

  const toggleCaptions = () => {
    if (!selectedMovie?.subtitleUrl) return;
    setIsCaptionsEnabled((enabled) => !enabled);
  };

  const skipVideo = (seconds) => {
    const video = videoRef.current;
    if (!video) return;

    const maxTime = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    const nextTime = Math.min(Math.max(video.currentTime + seconds, 0), maxTime);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleFullscreen = async () => {
    const previewBox = previewBoxRef.current;
    if (!previewBox) return;

    try {
      if (!document.fullscreenElement || document.fullscreenElement !== previewBox) {
        await previewBox.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = document.fullscreenElement === previewBoxRef.current;
      setIsFullscreen(isNowFullscreen);

      if (!isNowFullscreen) {
        if (hideControlsTimerRef.current) {
          window.clearTimeout(hideControlsTimerRef.current);
        }
        setIsControlsVisible(true);

        if (isVideoPlaying) {
          hideControlsTimerRef.current = window.setTimeout(() => {
            setIsControlsVisible(false);
          }, 3000);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    handleFullscreenChange();

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isVideoPlaying]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setHasStarted(false);
    setIsVideoPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsCaptionsEnabled(false);
    setIsControlsVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedMovie(null);
    setHasStarted(false);
    setIsVideoPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsControlsVisible(false);
  };

  useEffect(() => {
    if (!selectedMovie) return undefined;

    const stopControlsHide = () => {
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
      setIsControlsVisible(false);
    };

    const resetHideTimer = () => {
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }

      setIsControlsVisible(true);

      // Only hide controls if video is playing; keep visible if paused
      if (isVideoPlaying) {
        hideControlsTimerRef.current = window.setTimeout(() => {
          setIsControlsVisible(false);
        }, 3000);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
        return;
      }

      const activeTag = document.activeElement?.tagName;
      const isPlayerControlFocused = previewBoxRef.current?.contains(document.activeElement);
      if (
        (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') &&
        !isPlayerControlFocused
      ) {
        return;
      }

      resetHideTimer();

      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        setIsControlsVisible(true);
        togglePlay();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        skipVideo(-10);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        skipVideo(10);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setVolume((prev) => Math.min(prev + 0.1, 1));
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setVolume((prev) => Math.max(prev - 0.1, 0));
        return;
      }

      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault();
        toggleMute();
      }
    };

    const previewBox = previewBoxRef.current;
    if (!previewBox) return undefined;

    previewBox.addEventListener('mousemove', resetHideTimer);
    previewBox.addEventListener('mouseenter', resetHideTimer);
    previewBox.addEventListener('click', resetHideTimer);
    previewBox.addEventListener('mouseleave', stopControlsHide);
    window.addEventListener('keydown', handleKeyDown);

    // Initialize timer immediately if video is playing
    if (isVideoPlaying) {
      resetHideTimer();
    }

    return () => {
      previewBox.removeEventListener('mousemove', resetHideTimer);
      previewBox.removeEventListener('mouseenter', resetHideTimer);
      previewBox.removeEventListener('click', resetHideTimer);
      previewBox.removeEventListener('mouseleave', stopControlsHide);
      window.removeEventListener('keydown', handleKeyDown);
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, [selectedMovie, isVideoPlaying]);

  const renderDetailView = () => {
    if (!selectedMovie) return null;

    const shouldShowVideo = hasStarted || isVideoPlaying || currentTime > 0;
    const showControls = shouldShowVideo && isControlsVisible;

    return (
      <>
        <div className="movie-detail-page">
          <div className="movie-detail-shell">
            <div className="detail-header-row">
              <button type="button" className="back-button" onClick={handleBack}>
                ← Back
              </button>
              <h2>{selectedMovie.title}</h2>
            </div>

            <div className="movie-detail-layout">
              <div className="movie-detail-card">
                <div className="detail-info">
                  <div
                    ref={previewBoxRef}
                    className={`video-preview-box ${shouldShowVideo ? 'has-video-active' : ''}`}
                  >
                    <div
                      className="video-preview-background"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("${selectedMovie.image}")`,
                      }}
                      aria-hidden="true"
                    />
                    <video
                      ref={videoRef}
                      className={`movie-video-player ${shouldShowVideo ? 'is-visible' : 'is-hidden'}`}
                      src={PREVIEW_VIDEO_URL}
                      playsInline
                      preload="metadata"
                      controls={false}
                      onClick={togglePlay}
                    >
                      {selectedMovie.subtitleUrl && (
                        <track
                          kind="subtitles"
                          src={selectedMovie.subtitleUrl}
                          srcLang="en"
                          label="English"
                        />
                      )}
                    </video>

                    {!shouldShowVideo && (
                      <button
                        type="button"
                        className="play-overlay"
                        onClick={togglePlay}
                        aria-label={`Play ${selectedMovie.title}`}
                      >
                        ▶
                      </button>
                    )}

                    {showControls && (
                      <PlayerControls
                        currentTime={currentTime}
                        duration={duration}
                        volume={volume}
                        isMuted={isMuted}
                        isCaptionsEnabled={isCaptionsEnabled}
                        hasCaptions={Boolean(selectedMovie.subtitleUrl)}
                        isVideoPlaying={isVideoPlaying}
                        isFullscreen={isFullscreen}
                        formatTime={formatTime}
                        onSeek={handleSeek}
                        onVolume={handleVolume}
                        onToggleMute={toggleMute}
                        onToggleCaptions={toggleCaptions}
                        onTogglePlay={togglePlay}
                        onSkip={skipVideo}
                        onToggleFullscreen={toggleFullscreen}
                      />
                    )}
                  </div>
                </div>
              </div>

              <MovieSidebar recentMovies={recentMoviesList} onSelectMovie={handleSelectMovie} />
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  };

  return (
    <div className="movie-page">
      <MovieHeader
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        searchTerm={searchQuery}
        onSearchTermChange={setSearchQuery}
      />

      {selectedMovie ? (
        renderDetailView()
      ) : (
        <>
          <div className="movie-content">
            <MovieGrid
              category={activeCategoryLabel}
              movies={paginatedMovies}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              searchQuery={searchQuery}
              onSelectMovie={handleSelectMovie}
            />
            <MovieSidebar recentMovies={recentMoviesList} onSelectMovie={handleSelectMovie} />
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}
