/**
 * Add your videos here:
 * - YouTube: video ID only, or a full embed URL (https://www.youtube.com/embed/...)
 * - MP4 on disk (local only): "media/0506.mp4" — this path is NOT on GitHub if the file
 *   is gitignored (GitHub blocks files over 100 MB). For GitHub Pages, use one of:
 *   - Upload the lesson to YouTube (unlisted is fine) and put the video ID here, or
 *   - Upload the MP4 as a GitHub Release asset, then paste the full .mp4 download URL here.
 * Leave "" for a placeholder in that section.
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
    if (isVideoFile(t)) return { type: "video", src: t };
    if (/^https?:\/\//i.test(t)) return { type: "iframe", url: t };
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
      var vid = mount.querySelector("video");
      if (vid) {
        vid.addEventListener("error", function () {
          mount.innerHTML =
            '<div class="video-placeholder video-placeholder--error"><p><strong>Video did not load.</strong> On GitHub Pages the file <code>media/0506.mp4</code> is usually missing because large MP4s are not stored in the repo. Fix: upload your lesson to YouTube and set your <code>word</code> value to the video ID, or attach the MP4 to a <a href="https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository" rel="noopener noreferrer">GitHub Release</a> and paste the full <code>.mp4</code> download URL in <code>videos.js</code>.</p></div>';
        });
      }
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
