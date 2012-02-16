<?php
namespace Hakunamatata;

require_once(__DIR__ . '/../classes/Autoload.class.php');
spl_autoload_register(__NAMESPACE__ . '\Autoload::load');

$request = new Request();

if(!$request->uri(0)) {
  $index = new IndexController();
  $index->indexAction();
}
