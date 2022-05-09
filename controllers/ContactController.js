const nodemailer = require('nodemailer');

class ContactController {

    index(req, res) {
        res.render('contact');
    }

    send(req, res) {
        const output = `
        <H2> Bạn đang có một yêu cầu tư vấn du học mới từ website  </h2>
        <h4> Thông tin liên hệ </h3>
        <ul>
            <li>Tên khách hàng: ${req.body.name} </li>
            <li>Địa chỉ email: ${req.body.email} </li>
            <li>Số điện thoại liên hệ: ${req.body.phone} </li>
            <li>Thông tin cần tư vấn: ${req.body.message} </li>
            
        </ul>
    
        `;


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'formmail850@gmail.com', // generated ethereal user
                pass: 'yrcjemfmdybuqtre', // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false,
            }
        });

        // send mail with defined transport object
        let info = transporter.sendMail({
            from: '"Du Học Henry Nguyen👻✍(◔◡◔)" <formmail850@gmail.com>', // sender address
            to: "info.dhtm@gmail.com", // list of receivers
            subject: "Yêu cầu đăng ký tư vấn mới", // Subject line
            text: "Xin chào, Du học Henry Nguyen", // plain text body
            html: output, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg:'Đăng ký tư vấn đã được gửi, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!!!😁😍'})
    }



}


module.exports = new ContactController;


