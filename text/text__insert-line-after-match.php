#!/usr/bin/env php
<?php
/**
 * Insert line after match.
 *
 * @param string Match in string
 * @param string New line
 * @param string File path
 *
 * @example
 * ./hakunamatata/text/text__insert-line-after-match.php "\$app->configure('app');" "\$app->configure('swagger-lume');" bootstrap/app.php
 *
 */

if (count($argv) != 4) {
    echo "Invalid parameters" . PHP_EOL;
    exit();
}

define('MATCH',       $argv[1]);
define('NEW_LINE',    $argv[2]);
define('FILE_PATH',   getcwd() . '/' . $argv[3]);

$file_data         = file(FILE_PATH);
$file_data_changed = [];

foreach ($file_data as $line) {
    $file_data_changed[] = $line;

    if (strstr($line, MATCH)) {
        $file_data_changed[] = NEW_LINE . PHP_EOL;
    }
}

file_put_contents(FILE_PATH, implode('', $file_data_changed));
