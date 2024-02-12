const os = require("os");
const fs = require('fs');
const fetch = require('node-fetch');
const {
    writeFile,
    unlink,
} = require('fs').promises;
const AdmZip = require('adm-zip');
const tar = require('tar');

function normalizeVersionName(version) {
    return version.replace(/^nightly-[0-9a-f]{40}$/, "nightly");
}

function mapArch(arch) {
    const mappings = {
        x32: "386",
        x64: "amd64",
    };

    return mappings[arch] || arch;
}

function getDownloadObject(version) {
    const platform = os.platform();
    const filename = `foundry_${normalizeVersionName(version)}_${platform}_${mapArch(os.arch())}`;
    const extension = platform === "win32" ? "zip" : "tar.gz";
    const url = `https://github.com/foundry-rs/foundry/releases/download/${version}/${filename}.${extension}`;

    return {
        url,
        filename: `${filename}.${extension}`,
        binPath: "./",
    };
}

function get_version() {
    if ("npm_config_foundry_version" in process.env) {
        return process.env.npm_config_foundry_version;
    } else if ("npm_package_config_foundry_version" in process.env) {
        return process.env.npm_package_config_foundry_version;
    }
    const project_package_path = process.env.npm_config_local_prefix;
    const package_obj = JSON.parse(fs.readFileSync(`${project_package_path}/package.json`, 'utf8'));
    if ("config" in package_obj && "foundry_version" in package_obj.config) {
        return package_obj.config.foundry_version;
    }

    return "nightly";
}


async function main() {
    try {
        const version = get_version();

        const download = getDownloadObject(version);
        console.info(`Downloading Foundry '${version}' from: ${download.url}`);
        const response = await fetch(download.url);
        const buffer = await response.buffer();
        await writeFile(download.filename, buffer);

        console.debug(`Extracting ${download.filename}`);
        if (download.url.endsWith("zip")) {
            const zip = new AdmZip(download.filename);
            zip.extractAllTo("./bin", true);
        } else {
            tar.x({
                file: download.filename,
                cwd: "./bin",
                sync: true,
            });
        }

        // remove the downloaded file
        await unlink(download.filename);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();