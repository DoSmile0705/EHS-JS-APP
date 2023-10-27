const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function loadFiles(dirName) {
    const files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
    files.forEach((file) => delete require.cache[require.resolve(file)]);
    return files;
}

module.exports = { loadFiles }