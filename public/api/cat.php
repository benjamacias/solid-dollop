<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$archivo = isset($_GET['archivo']) ? $_GET['archivo'] : '';
if (!$archivo) { http_response_code(400); echo json_encode(['error'=>'Falta nombre de archivo']); exit; }

if (strpos($archivo, '..') !== false || strpos($archivo, '/') !== false || strpos($archivo, '\\') !== false || !str_ends_with($archivo, '.txt')) {
    http_response_code(400);
    echo json_encode(['error'=>'Archivo no permitido']); exit;
}

$path = __DIR__ . '/../documentos/' . $archivo;
if (!file_exists($path)) { http_response_code(404); echo json_encode(['error'=>'Archivo no encontrado']); exit; }

$contenido = file_get_contents($path);
echo json_encode(['contenido' => $contenido !== false ? $contenido : '']);
