const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];
let filePath = `${__dirname}/${file}`;

switch (operation) {
   case 'read':
      fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
         if (err) {
            console.log(err);
         } else {
            console.log(data);
         }
      });
      break;

   case 'delete':
      fs.unlink(filePath, function (err) {
         if (err) {
            console.log(err);
            return;
         }
         console.log(`File '${file}' deleted`);
      });
      break;

   case 'create':
      fs.writeFile(file, '', function (err) {
         if (err) {
            console.log(err);
            return;
         }
         console.log(`File '${file}' created`);
      });
      break;

   case 'append':
      fs.appendFile(filePath, `\n${content}`, function (err) {
         if (err) {
            console.log(err);
         }
         console.log(`Content appended to the file '${file}'`);
      });
      break;

   case 'rename':
      fs.rename(`${file}`, `${content}`, function (err) {
         if (err) {
            console.log(err);
            return err;
         }
         console.log(`File '${file}' renamed to '${content}'`);
      });
      break;

   case 'list':
      fs.readdir(`${__dirname}`, function (err, files) {
         if (err) {
            console.log(err);
            return;
         }
         console.log(files);
      });
      break;

   default:
      console.log(`Invalid operation '${operation}'`);
}
