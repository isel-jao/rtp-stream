STREAM="rtsp://154.144.255.113:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream"


# // const ffmpeg = spawn("ffmpeg", [
# //   "-i",
# //   streamUrl, // Use the RTP stream URL as input
# //   "-c:v",
# //   "libx264", // Video codec
# //   "-c:a",
# //   "aac", // Audio codec
# //   "-f",
# //   "hls", // Output format HLS
# //   "-hls_time",
# //   "2", // Segment duration
# //   "-hls_list_size",
# //   "3", // Max number of playlist entries
# //   "public/stream.m3u8", // Output HLS playlist
# // ]);

# ffmpeg -fflags nobuffer \
#     -loglevel debug \
#     -rtsp_transport tcp stream \
#     -i $STREAM \
#     -fflags flush_packets \
#     -max_delay 5 \
#     -flags -global_header \
#     -hls_time 5 \
#     -hls_list_size 3 \
#     -vcodec copy \
#     -y ./public/index.m3u8


# ffmpeg -fflags nobuffer \
#  -loglevel debug \
#  -rtsp_transport tcp \
#  -i $STREAM \
#  -vsync 0 \
#  -copyts \
#  -vcodec copy \
#  -acodec copy \ # Ensure audio is included if your stream has audio
#  -movflags frag_keyframe+empty_moov \
#  -f hls \
#  -hls_time 4 \ # Increased segment length for better stability
#  -hls_list_size 6 \ # A bit larger list size for improved playback continuity
#  -hls_segment_type mpegts \
#  -hls_segment_filename './public/%d.ts' \
# ./public/index.m3u8

ffmpeg -fflags nobuffer \
 -loglevel error \
 -rtsp_transport tcp \
 -i $STREAM \
 -vsync 0 \
 -copyts \
 -vcodec libx264 \
 -tune zerolatency \
 -preset fast \
 -crf 23 \
 -acodec copy \
 -movflags frag_keyframe+empty_moov \
 -hls_flags delete_segments+append_list \
 -f hls \
 -hls_time 3 \
 -hls_list_size 5 \
 -hls_segment_type mpegts \
 -hls_segment_filename './public/%d.ts' \
./public/index.m3u8