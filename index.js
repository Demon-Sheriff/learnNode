const fs = require('fs');
const path = require('path');

const http = require('http');

content = `Nobody, nobody, nobody (ooh)
Nobody, nobody, nobody
Yeah
I'd take the fall
I got you covered when there's no one at all
Oh, yeah, and I'd stay through the night
When you got demons tryna break through the walls
There ain't no, no kinda line
That I wouldn't cross if you need me to
You're out here searchin' for signs
So I think it's finally time that you knew
Nobody got you the way I do (ooh)
Whatever demons you're fightin' through
When you need somebody to turn to (ooh)
Nobody got you the way I do
The way I do (woo)
Nobody, nobody, nobody (ayo)
Got you the way I do
Oh, nobody, nobody, nobody (ayo)
Nobody got you the way I do
The way I do (yeah, yeah)
When you go dark and the night gets so cold
I'll be on my way to you (oh yeah)
You know I ain't tryna lose you, oh, no
If you're in Hell, I'll go there too
There ain't no, no kinda line
That I wouldn't cross if you need me to
You're out here searchin' for signs
So I think it's finally time that you knew`


fs.writeFile('ex.txt', content, (e) => {

    if(e){
        return console.error("Error while writing file.")
    }

    console.log("File written successfully !")
})

let data = fs.readFile('ex.txt', 'utf-8', (e,data) => {

    if(e){
        return console.error("Error while reading the file")
    }

    console.log("File content : ", data);
});


// appending some content
const appendThis = "\nOne Republic";

fs.appendFile('ex.txt', appendThis, (e) => {

    if(e){
        return console.error(`Error appending to file: ${err.message}`);
    }

    console.log("Data appended successfully !");

    // read the file after appending content into the file
    fs.readFile('ex.txt', 'utf-8', (e,data) => {
        if(e){
            return console.error("Failed to read file");

        }
        console.log(`File content :` , data);
    });
});

const copyFileFromOneDirToTargetDir = (src, dest) => {
    const srcFile = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest, path.basename(src)); // Ensure we use the basename of src for the destination

    // Check if the source file exists and has content
    fs.readFile(srcFile, 'utf8', (err, data) => {
        if (err) {
            return console.error(`Error reading source file: ${err.message}`);
        }
        
        console.log(`Source file content: ${data}`);
        
        // Copy the file
        fs.copyFile(srcFile, destPath, (err) => {
            if (err) {
                return console.error(`Error copying file: ${err.message}`);
            }
            console.log("File copied successfully!");

            // Verify the copied file content
            fs.readFile(destPath, 'utf8', (err, copiedData) => {
                if (err) {
                    return console.error(`Error reading copied file: ${err.message}`);
                }
                console.log(`Copied file content: ${copiedData}`);
            });
        });
    });
}

copyFileFromOneDirToTargetDir('ex.txt', 'dest-folder');



// creating and listening to the server.
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if(req.url === '/login') {
        res.write('<html> <head> <title>Login Page</title> </head> <body> <h1>Login Page</h1> </body> </html>');
      } 
    else {
    res.write('<html> <head> <title>My First Web Server</title> </head> <body> <h1>Hello, world!</h1> </body> </html>');
    }
    res.end();
});

const port = 3000;
const host = 'localhost';


server.listen(port,host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});