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
   
//====================================================
 
 //REMETENTE --> ESTE EMAIL TEM QUE SER VALIDO DO DOMINIO
 //==================================================== 
 $email_remetente = "contato@lithiumproducoes.com.br"; // deve ser uma conta de email do seu dominio 
 //====================================================
 
 //Configurações do email, ajustar conforme necessidade
 //==================================================== 
 $email_destinatario = "contato@lithiumproducoes.com.br"; // pode ser qualquer email que receberá as mensagens
 $email_reply = "$email"; 
 $email_assunto = "Contato do Site"; // Este será o assunto da mensagem
 //====================================================
 
 //Monta o Corpo da Mensagem
 //====================================================
 $email_conteudo = "Nome = $name \n"; 
 $email_conteudo .= "Email = $email \n";
 $email_conteudo .= "Telefone = $phone \n"; 
 $email_conteudo .= "Mensagem = $message \n"; 
 //====================================================
 
 //Seta os Headers (Alterar somente caso necessario) 
 //==================================================== 
 $email_headers = implode ( "\n",array ( "From: $email_remetente", "Reply-To: $email_reply", "Return-Path: $email_remetente","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ) );
 //====================================================
 
 //Enviando o email 
 //==================================================== 
 if (mail($email_destinatario, $email_assunto, nl2br($email_conteudo), $email_headers)){ 
 echo "<script>
            window.location='index.html';
            alert('$nome, sua mensagem foi enviada com sucesso! Estaremos retornando em breve');
        </script>"; 
 
 } 
 else{ 
 echo "</b>Falha no envio do E-Mail!</b>"; } 
 //====================================================
 
 ?>
 <a href="index.html">Clique aqui para voltar ao site</a>        
