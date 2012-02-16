<?php
namespace Hakunamatata;
class Autoload {
  public static function load($class_name) {
    $file_name = str_replace(__NAMESPACE__ . "\\",'', $class_name);

    $file_class      = __DIR__ . '/' . $file_name . '.class.php';
    $file_controller = __DIR__ . '/../controllers/' . $file_name . '.class.php';

    if(file_exists($file_class)) {
      require_once($file_class);
    } else if(file_exists($file_controller)) {
      require_once($file_controller);
    }
  }
}
