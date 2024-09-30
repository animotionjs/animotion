# Recording Videos

## Using The Recorder

You can record your presentation using the `<Recorder>` component:

```svelte
<script>
	import { Recorder } from '@animotion/core'
</script>

<Recorder />
```

- After you import the `<Recorder>` component you're going to be asked to give permission to share your screen, and microphone
- Select the window, or screen you want to record, and press `F11` to fullscreen your browser and start recording

## Default Settings

The default settings give you a nice balance of quality, and file size but you can use the [YouTube recommended upload encoding settings](https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Cbitrate) to change it.

> ⚠️ Before you start recording do a test recording to make sure everything is working properly, and adjust the settings accordingly.

These are the default video settings:

```svelte
<script>
	import { Recorder } from '@animotion/core'
</script>

<Recorder
	codec="video/mp4"
	fps={60}
	videoBitrate={2500}
	audioBitrate={320}
	systemAudio={true}
	useTimer={true}
	useMicrophone={true}
/>
```

- **MP4** container (**VP9** video codec, **Opus** audio codec)
- **60** FPS
- **2,5 mbps** (2500 kbps) video bitrate
- **320 kbps** audio bitrate
- Captures system audio
- **Timer** enabled
- **Microphone** enabled

## You Can Change The Video Type

You can change the video container, and codecs like in this example which uses the [AVC (H.264)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264) video codec, and [AAC](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs#aac_advanced_audio_coding) for the audio codec:

```svelte
<script>
	import { Recorder } from '@animotion/core'
</script>

<Recorder codec="video/mp4;codecs='avc1.4d002a,mp4a.40.2'" />
```

For available options you can read the [Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs) for the video codec options, and [Web audio codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs) for the audio codec options.