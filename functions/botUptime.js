function uptimeConv(time) {
    function secToDhms(sec) {
        const d = Math.floor(sec / (3600 * 24));
        const h = Math.floor(sec % (3600 * 24) / 3600);
        const m = Math.floor(sec % 3600 / 60);
        const s = Math.floor(sec % 60);

        const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " second, " : " seconds ") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
    return secToDhms(time / 1000)
}
module.exports = { uptimeConv };