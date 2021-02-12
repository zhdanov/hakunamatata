<?php
error_reporting(E_ALL);

$config = yaml_parse_file(__DIR__ . '/config.yaml');

$port = 8000;
$host = '127.0.0.1';

if (isset($config['socket-render'])) {
    if (isset($config['socket-render']['port'])) {
        $port = $config['socket-render']['port'];
    }

    if (isset($config['socket-render']['host'])) {
        $host = $config['socket-render']['host'];
    }
}

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
}

$result = socket_connect($socket, $host, $port);
if ($result === false) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
}

$data = [
    'block' => 'topbar',
    'params' => [
        'logo' => '/cdn/img/s/logo.png',
        'menu' => [
            ['title' => 'Catalog', 'href' => '/catalog'],
            ['title' => 'About', 'href' => '/about'],
        ],
        'links' => [
            ['title' => 'Archive', 'href' => '/archive'],
            ['title' => 'Telegram', 'href' => '/telegram-link'],
        ]
    ]
];

$encdata = json_encode($data);

socket_write($socket, $encdata, strlen($encdata));

$line = trim(socket_read($socket, 2048));
socket_close($socket);

echo $line . "\n";
