<?php
namespace Hakunamatata;

class PDOFactory {
  private static $instance = false;

  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new \PDO('pgsql:host=localhost;port=5432;dbname=hakunamatata;user=hakunamatata;password=hakunamatata');
    }
    return self::$instance;
  }
}
