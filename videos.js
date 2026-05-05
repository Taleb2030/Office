/**
 * Add your videos here:
 * - YouTube: paste only the video ID (after v=), or a full https embed URL
 * - MP4 / WebM / OGG: use a path relative to index.html, e.g. "media/0506.mp4"
 * Leave "" to show the placeholder for that section.
 */
window.OFFICE_VIDEOS = {
  word: "media/0506.mp4",
  excel: "",
  powerpoint: "",
};

(function () {
  const mounts = [
    { id: "video-mount-word", key: "word" },
    { id: "video-mount-excel", key: "excel" },
    { id: "video-mount-powerpoint", key: "powerpoint" },
  ];

  function isVideoFile(path) {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(path);
  }

  /** @returns {{ type: 'iframe', url: string } | { type: 'video', src: string } | null} */
  function resolveMedia(raw) {
    if (!raw || typeof raw !== "string") return null;
    const t = raw.trim();
    if (!t) return null;
    if (/^https?:\/\//i.test(t)) return { type: "iframe", url: t };
    if (isVideoFile(t)) return { type: "video", src: t };
    return {
      type: "iframe",
      url: "https://www.youtube.com/embed/" + encodeURIComponent(t),
    };
  }

  function escapeAttr(s) {
    return String(s).replace(/"/g, "&quot;");
  }

  function render(mount, media) {
    if (!mount) return;
    if (!media) {
      mount.innerHTML =
        '<div class="video-placeholder"><p>Add your video in <code>videos.js</code> — YouTube ID, embed URL, or a path like <code>media/your.mp4</code>.</p></div>';
      return;
    }
    if (media.type === "video") {
      mount.innerHTML =
        '<div class="video-frame video-frame--html5">' +
        '<video controls playsinline preload="metadata" src="' +
        escapeAttr(media.src) +
        '">Video is not supported in this browser.</video></div>';
      return;
    }
    mount.innerHTML =
      '<div class="video-frame">' +
      '<iframe src="' +
      escapeAttr(media.url) +
      '" title="Course video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>' +
      "</div>";
  }

  const cfg = window.OFFICE_VIDEOS || {};

  mounts.forEach(function (item) {
    var el = document.getElementById(item.id);
    render(el, resolveMedia(cfg[item.key]));
  });
})();
