<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$dataFile = __DIR__ . '/../data/anotaciones.json';
if (!file_exists(dirname($dataFile))) { mkdir(dirname($dataFile), 0755, true); }
if (!file_exists($dataFile)) { file_put_contents($dataFile, "[]"); }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $raw = file_get_contents($dataFile);
    if ($raw === false || $raw === '') { echo "[]"; exit; }
    echo $raw; exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $json = json_decode($input, true);
    if (!$json || !isset($json['titulo']) || !isset($json['contenido'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos']); exit;
    }
    $raw = file_get_contents($dataFile);
    $arr = $raw ? json_decode($raw, true) : [];
    if (!is_array($arr)) $arr = [];
    $arr[] = [
        'titulo' => $json['titulo'],
        'contenido' => $json['contenido'],
        'fecha' => date('c')
    ];
    $tmp = $dataFile . '.tmp';
    file_put_contents($tmp, json_encode($arr, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
    rename($tmp, $dataFile);
    echo json_encode(['ok' => true]); exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
