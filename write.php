<?php
    $host = "127.0.0.1"; 
    $port = 3400;
    
    if(!($sock = socket_create(AF_INET, SOCK_STREAM, 0)))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
     
    die("Couldn't create socket: [$errorcode] $errormsg \n");
}
 
    echo "Socket created \n";
     
    //Connect socket to remote server
    if(!socket_connect($sock , $host , $port))
    {
        $errorcode = socket_last_error();
        $errormsg = socket_strerror($errorcode);
         
        die("Could not connect: [$errorcode] $errormsg \n");
    }
    
    $message = "output;ahoj";
    
    if( ! socket_send ( $sock , $message , strlen($message) , 0))
    {
        $errorcode = socket_last_error();
        $errormsg = socket_strerror($errorcode);
         
        die("Could not send data: [$errorcode] $errormsg \n");
    }
 
?>
