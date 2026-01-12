import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("effect запущен");

    const fetchTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://musicfun.it-incubator.app/api/1.0/playlists/tracks",
          {
            headers: {
              "api-key": "3b8402d2-8181-4ab9-ba7b-c129c7182cd1",
            },
            // Добавляем таймаут и обработку сетевых ошибок
            signal: AbortSignal.timeout(15000),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Данные получены:", json.data);

        // Проверяем структуру ответа
        if (json && json.data) {
          setTracks(json.data);
        } else {
          setTracks([]);
        }
        setError(null);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError(error.message || "Failed to load tracks");
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  // Используем безопасный доступ к данным
  // const selectedTrack = tracks?.find((track) => track.id === selectedTrackId);

  console.log("Текущие tracks:", tracks);
  console.log("Выбранный трек ID:", selectedTrackId);
  console.log("Выбранный трек:", selectedTrack);

  console.log("Загрузка:", loading);
  console.log("ошибка:", error);
  //console.log("like", likecount);

  if (loading) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span> Loading ... </span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <div style={{ color: "red" }}>Error: {error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span> No tracks available </span>
      </div>
    );
  }

  return (
    <>
      <h1>Musicfun player</h1>
      <button
        onClick={() => {
          console.log("Сброс выбора трека");
          setSelectedTrackId(null);
          setSelectedTrack(null);
        }}
      >
        reset selection
      </button>

      <div
        style={{
          /* display: "flex", */
          gap: "30px",
        }}
      >
        <ul>
          {tracks.map((track) => {
            const isSelected = track.id === selectedTrackId;

            return (
              <li
                key={track.id}
                style={{
                  border: isSelected ? "2px solid orange" : "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                <div
                  onClick={() => {
                    console.log("Клик по треку:", track.attributes?.title);
                    console.log("ID трека:", track.id);
                    setSelectedTrackId(track.id);
                    setSelectedTrack(track);
                  }}
                  style={{
                    cursor: "pointer",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  {/* Исправлено: было attribute.title, должно быть attributes.title */}
                  {track.attributes?.title || "Untitled track"}
                </div>
                <audio
                  src={track.attributes.attachments[0].url}
                  style={{ marginTop: "10px" }}
                  controls
                ></audio>
              </li>
            );
          })}
        </ul>
        <div>
          <h3>Detail</h3>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>Detail</h3>
        {selectedTrackId === null
          ? "Track is not selected"
          : // Исправлено: было attribute?.title, должно быть attributes?.title
          `Selected: ${selectedTrack?.attributes?.title || "Unknown track"}`}
      </div>
    </>
  );
}

export default App;
