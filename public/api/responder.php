<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit; }

$payload = json_decode(file_get_contents('php://input'), true);
$input = isset($payload['input']) ? strtolower(trim(preg_replace('/[^\w\s]/u', '', $payload['input']))) : '';

$respuestasPath = __DIR__ . '/../respuestas.json';
if (!file_exists($respuestasPath)) { echo json_encode(['respuesta' => 'Sin base de respuestas']); exit; }
$respuestas = json_decode(file_get_contents($respuestasPath), true);
if (!is_array($respuestas)) { echo json_encode(['respuesta' => 'Base de respuestas inválida']); exit; }

function levenshtein_ratio($a, $b) {
    $len = max(strlen($a), strlen($b));
    if ($len === 0) return 1.0;
    $dist = levenshtein($a, $b);
    return 1 - $dist / $len;
}

$best = null;
$bestScore = 0.0;
foreach ($respuestas as $item) {
    $clave = isset($item['clave']) ? $item['clave'] : '';
    $ratio = levenshtein_ratio($input, $clave);
    if ($ratio > $bestScore) {
        $bestScore = $ratio;
        $best = $item['respuesta'] ?? null;
    }
}

echo json_encode([
    'respuesta' => ($bestScore >= 0.32 && $best) ? $best : 'No entendí eso, ¿podrías repetirlo?'
]);
