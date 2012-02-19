<?php
namespace Hakunamatata;

class IndexController {
  public function indexAction() {
    $db = PDOFactory::getInstance();
    $twig = TwigFactory::getInstance();

    echo $twig->render('index/index.html', array('title'=>'Title'));
  }
}
