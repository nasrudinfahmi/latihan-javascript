// ambil semua elemen video
const videos = Array.from(document.querySelectorAll("[data-duration]"));

// pilih hanya yang javascript lanjutan
let jsLanjut = videos
  .filter((video) => video.textContent.includes("JAVACRIPT-LANJUTAN"))

  // ambil masing-masing durasi video
  .map((item) => item.dataset.duration)

  // ubah durasi menjadi parseFloat, dan ubah menit menjadi detik
  .map((waktu) => {
    const parts = waktu.split(":").map((part) => parseFloat(part));
    return parts[0] * 60 + parts[1];
  })

  // jumlahkan semua detik
  .reduce((acc, curr) => acc + curr);

// ubah formatnya menjadi jam, menit, detik
const jam = Math.floor(jsLanjut / 3600);
const menit = Math.floor((jsLanjut - jam * 3600) / 60);
const detik = jsLanjut - jam * 3600 - menit * 60;

// simpan di DOM
const jmlVideo = document.querySelector(".jml-video");
let totalJsLanjutan = videos.filter((video) => video.textContent.includes("JAVACRIPT-LANJUTAN")).length;
jmlVideo.textContent = `${totalJsLanjutan}`;

const totalDurasi = document.querySelector(".total-durasi");
totalDurasi.textContent = `${jam} jam, ${menit} mennit, ${detik} detik.`;
