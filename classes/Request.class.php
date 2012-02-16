<?php
namespace Hakunamatata;
class Request {
  private $get  =  array();
  private $post = array();
  private $uri  = array();

  public function __construct() {
    $this->get  = $this->prepare($_GET);
    $this->post = $this->prepare($_POST);
    $this->uri  = $this->prepare(explode('/', substr($_SERVER['REQUEST_URI'],1)));
  }

  /* @param array $_GET, $_POST */
  private function prepare($array) {
    foreach ($array as $k => $v) {
      $array[$k] = preg_replace('/[^0-9a-z]+/', '', $v);
    }
    return $array;
  }

  public function uri($key = false) {
    if(is_numeric($key)) {
      if(isset($this->uri[$key])) {
        $result = $this->uri[$key];
      } else {
        $result = false;
      }
    } else {
      $result = $this->uri;
    }

    return $result;
  }
}
