const http = require('http');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const querystring = require('querystring');

//NODEMAILER SPECIFIC STUFF
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'certificatemaker008@gmail.com' || process.env.EMAIL,
        pass: 'DU5p7VirjUjUS2j' || process.env.PASSWORD
    }
});

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extname = path.extname(filePath);

    let ContentType = 'text/html';

    switch (extname) {
        case '.js':
            ContentType = 'text/javascript';
            break;

        case '.css':
            ContentType = 'text/css';
            break;

        case '.json':
            ContentType = 'application/json';
            break;

        case '.png':
            ContentType = 'image/png';
            break;

        case '.jpg':
            ContentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': ContentType });
            res.end(content, 'utf-8');
        }
    });

    if (req.method === 'POST') {
        collectRequestData(req, result => {
            let mailOptions = {
                from: 'noreply@gmail.com',
                to: result.sender,
                subject: result.subject,
                html: result.msgBody,
                attachments: [
                    {
                        filename: 'textfile.txt',
                        // path: path.join(__dirname, 'public', 'filename.txt')
                        content: result.hiddenData
                    }
                ]
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.writeHead(500);
                    res.end(`Server error: ${error.code}`);
                } else {
                    fs.readFile(filePath, (err, content) => {
                        if (err) {
                            if (err.code == 'ENOENT') {
                                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content, 'utf-8');
                                });
                            } else {
                                res.writeHead(500);
                                res.end(`Server error: ${error.code}`);
                            }
                        } else {
                            res.writeHead(200, { 'Content-Type': ContentType });
                            res.end(content, 'utf-8');
                        }
                    });
                }
            });


        });
    }

});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.parse(body));
        });
    }
    else {
        callback(null);
    }
}


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));