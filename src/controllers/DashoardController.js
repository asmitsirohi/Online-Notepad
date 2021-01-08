const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const authentication = require('../../config');

class DashboardController {
    index = (req, res) => {
        fs.readFile(path.join(__dirname, '../../public/assets', 'fontFamily.bin'), 'utf8', (err, data) => {
            if (err) console.log(err);

            let dataString = data.toString();
            let dataArr = dataString.split('\r\n');

            let params = { title: 'Notepad', dataArr, mailResponse: false };
            res.status(200).render('dashboard', params);
        });
    }

    mail = (req, res) => {
        let mailResponse = false;
        //NODEMAILER SPECIFIC STUFF
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: authentication.username,
                pass: authentication.password
            }
        });

        let mailOptions = {
            from: 'noreply@gmail.com',
            to: req.body.sender,
            subject: req.body.subject,
            html: req.body.msgBody,
            attachments: [
                {
                    filename: 'textfile.txt',
                    content: req.body.hiddenData
                }
            ]
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                let params = { title: '500 Error', errorMsg : `Server error: ${error.code}`};
                res.status(500).render('500', params);
            } else {
                mailResponse = true;
                fs.readFile(path.join(__dirname, '../../public/assets', 'fontFamily.bin'), 'utf8', (err, data) => {
                    if (err) console.log(err);

                    let dataString = data.toString();
                    let dataArr = dataString.split('\r\n');

                    let params = { title: 'Notepad', dataArr , mailResponse};
                    res.status(200).render('dashboard', params);
                });
            }
        });
    }
}

module.exports = DashboardController;