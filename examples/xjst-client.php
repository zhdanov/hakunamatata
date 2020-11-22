<?php
error_reporting(E_ALL);

$port = 3000;
$address = '127.0.0.1';

// create socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
}

// connect to node app
$result = socket_connect($socket, $address, $port);
if ($result === false) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
}

// data we want to send
$data = [
    'block' => 'topbar',
    'content' => [
        'logo' => '/cdn/img/s/logo.png',
        'menu' => [
          ['Menu item 1', "/catalog"],
          ['Menu item 2', "/about"],
        ],
        'links' => [
          ['Link item 1', '/archive'],
          ['Link item 2', '/telegram-link'],
        ]
    ]
];

// prepares to transmit it
$encdata = json_encode($data);

// send data
socket_write($socket, $encdata, strlen($encdata));

// get data and close connection
$line = trim(socket_read($socket, 2048));
socket_close($socket);

echo $line;
echo "\n";
