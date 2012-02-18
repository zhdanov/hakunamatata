<?php
namespace Hakunamatata;

class RequestFactory {
  private static $instance = false;

  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new Request();
    }
    return self::$instance;
  }
}
