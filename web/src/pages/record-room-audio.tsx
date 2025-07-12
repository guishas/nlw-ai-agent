/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('audio', audio, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação de áudio');
      return;
    }

    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      recorder.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      });

      recorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          uploadAudio(event.data);
        }
      };

      recorder.current.onstart = () => {
        console.log('Iniciando gravação');
      };

      recorder.current.onstop = () => {
        console.log('Parando gravação');
      };

      recorder.current.start();
    } catch (error) {
      console.error(error);
    }
  }

  if (!params.roomId) {
    return <Navigate to="/" />;
  }

  return (
    <h1 className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar aúdio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </h1>
  );
}
