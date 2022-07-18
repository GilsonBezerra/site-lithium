<?php
ini_set('default_charset','UTF-8');
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
      echo  "<script>
               window.location='index.html';
               alert('Todos os campos são de preenchimento obrigatório!');
            </script>"; ;
      return "index.html";
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'contato@lithiumproducoes.com.br'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = utf8_decode("Contato do site de:  $name";)
$email_body = utf8_decode("Você acaba de receber um novo contato via site Lithium Produções!.\n\n"."Veja os detalhes:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message");
$headers = "From: contato@lithiumproducoes.com.br\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>