import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class send_Email:
    def __init__(self) -> None:
        pass

    def data_email(self, email, token):    
        sender = 'lewisguerrero20@gmail.com'
        password = 'ytyh zbth spio sdll'
        server = 'smtp.gmail.com'  
        port = 465  
        to = email


        message = MIMEMultipart("alternative")
        message["Subject"] = "Codigo de reestablecimiento de cuenta"
        message["From"] = sender
        message["To"] = to

        body = f"""\
            <html>
            <body>
                <h2>Correo Electronico: </h2>
                <h2>{email}</h2>
                <h3>Token:</h3>
                <h3>{token}</h3>
            </body>
            </html>
            """


        part = MIMEText(body, "html")
        message.attach(part)
        try:
            smtp_server = smtplib.SMTP_SSL(server, port)
            smtp_server.ehlo()
            smtp_server.login(sender, password)
            smtp_server.sendmail(sender, to, message.as_string())
            smtp_server.close()
            print ("¡Se ha enviado correctamente!")
        except Exception as ex:
            print ("Ha ocurrido un error...",ex)
