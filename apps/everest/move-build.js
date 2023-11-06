/* eslint-disable no-undef */
import * as path from 'path';
import * as fs from 'fs';

const moveFiles = (sourceDir, targetDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        reject(err)
        return;
      }

      files.forEach((file) => {
        const oldPath = path.join(sourceDir, file);
        const newPath = path.join(targetDir, file);
        const stat = fs.lstatSync(oldPath);

        if (stat.isDirectory()) {
          moveFiles(oldPath, targetDir)
            .then(() => {
              if (files.indexOf(file) === files.length - 1) {
                resolve();
              }
            })
            .catch((err) => reject(err));
        } else if (stat.isFile()) {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              reject(err);
              return;
            }

            if (files.indexOf(file) === files.length - 1) {
              resolve();
            }
          });
        }
      });
    });
  });
}

const checkDistEnvVarAndMove = async () => {
  const envDir = process.env.EVEREST_OUT_DIR;

  if (envDir) {
    const outDir = path.join(process.cwd(), '../..', envDir);

    console.log(`Outputting Everest files to: ${outDir}`);

    fs.rmSync(outDir, { force: true, recursive: true });
    fs.mkdirSync(outDir);
    await moveFiles('./dist', outDir).catch((err) => console.log(err))
    fs.rmSync('./dist', { force: true, recursive: true });
  }
};

checkDistEnvVarAndMove();