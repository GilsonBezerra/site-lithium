<?php
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

$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
   
// Create the email and send the message
$to = 'contato@lithiumproducoes.com.br'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Contato do site de:  $name";
$email_body = implode("\n", array("Você acaba de receber um novo contato via site Lithium Produções!.\n\n"."Veja os detalhes:\n\nNome: $name\n\nEmail: $email_address\n\nTelefone: $phone\n\nMensagem:\n$message", ,"MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8"));
$headers = "From: contato@lithiumproducoes.com.br\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address"; 
// $email_headers = implode ( "\n",array ( "From: contato@lithiumproducoes.com.br\n", "Reply-To: $email_address\n\n", "Return-Path: $email_address\n\n","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ));  
mail($to,$email_subject,$email_body,$headers);
return true;         
?>