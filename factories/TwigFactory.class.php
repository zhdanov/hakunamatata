<?php
namespace Hakunamatata;
require_once(__DIR__ . '/../libs/Twig/Autoloader.php');

class TwigFactory {
  private static $instance =  false;

  public static function getInstance() {
    if(!self::$instance) {
      \Twig_Autoloader::register();
      $loader = new \Twig_Loader_Filesystem(__DIR__ . '/../templates');
      self::$instance = new \Twig_Environment($loader, array('cache' => __DIR__ . '/../cache/twig'));
    }
    return self::$instance;
  }
}
