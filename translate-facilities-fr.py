#!/usr/bin/env python3
"""
Extract and translate facilities keys to French
"""

import re
import json

# Read ES file
with open('i18n/locales/es.ts', 'r', encoding='utf-8') as f:
    es_content = f.read()

# Extract facilities keys
def extract_keys(content, prefix):
    keys = {}
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        match = re.match(rf'^\s\s({prefix}\w+):\s*([\'"`].*[\'"`],?|$)', line)
        if match:
            key = match.group(1)
            rest = match.group(2).strip()

            if rest and (rest.endswith("',") or rest.endswith('",') or rest.endswith('`,') or rest.endswith("'")):
                if rest.startswith("'"):
                    value = rest[1:].rstrip("',").replace("\\'", "'")
                elif rest.startswith('"'):
                    value = rest[1:].rstrip('",').replace('\\"', '"')
                elif rest.startswith('`'):
                    value = rest[1:].rstrip('`,')
                else:
                    value = rest
                keys[key] = value
            else:
                # Multiline value
                value_lines = []
                i += 1
                while i < len(lines):
                    next_line = lines[i]
                    if re.match(r'^\s\s\w+:', next_line):
                        i -= 1
                        break
                    value_lines.append(next_line)
                    if "',)," in next_line or next_line.strip().endswith("',") or next_line.strip().endswith('",'):
                        break
                    i += 1

                full_value = '\n'.join(value_lines)
                full_value = re.sub(r"^['\"``\s]+", '', full_value)
                full_value = re.sub(r"['\"``],?\s*$", '', full_value)
                keys[key] = full_value.strip()

        i += 1

    return keys

print("Extracting facilities keys from ES...")
facilities_es = extract_keys(es_content, 'facilities')
print(f"Found {len(facilities_es)} facilities keys")

# Simple translation patterns for French
def translate_to_french(text):
    if not text or not isinstance(text, str):
        return text

    translations = {
        'Instalaciones': 'Installations',
        'Escuela de Baile': 'École de Danse',
        'en Barcelona': 'à Barcelone',
        'Más de': 'Plus de',
        'dedicados a la danza': 'dédiés à la danse',
        'en el corazón de': 'au cœur de',
        'Barcelona': 'Barcelone',
        'Calle': 'Rue',
        'Entre': 'Entre',
        'Plaza España': "Place d'Espagne",
        'Reserva Tu Clase de Prueba': "Réservez Votre Cours d'Essai",
        'Conoce nuestras instalaciones': 'Découvrez nos installations',
        'en persona': 'en personne',
        'Solicita un Tour': 'Demandez une Visite',
        'Descubre nuestros espacios': 'Découvrez nos espaces',
        'Nuestras Instalaciones': 'Nos Installations',
        'salas de baile': 'salles de danse',
        'equipadas con': 'équipées de',
        'sistema de sonido': 'système de son',
        'profesional': 'professionnel',
        'espejos': 'miroirs',
        'suelos': 'sols',
        'especiales': 'spéciaux',
        'vestuarios': 'vestiaires',
        'duchas': 'douches',
        'zona de espera': "zone d'attente",
        'recepción': 'réception',
        'WiFi gratis': 'WiFi gratuit',
        'aire acondicionado': 'climatisation',
        'Ubicación': 'Emplacement',
        'perfecta': 'parfait',
        'muy bien conectada': 'très bien desservie',
        'metro': 'métro',
        'autobús': 'bus',
        'Cómo llegar': 'Comment arriver',
        'Horario': 'Horaire',
        'de lunes a viernes': 'du lundi au vendredi',
        'sábados': 'samedis',
        'domingos': 'dimanches',
        'cerrado': 'fermé',
        'Por qué': 'Pourquoi',
        'Qué': 'Que',
        'Características': 'Caractéristiques',
        'amplias': 'spacieuses',
        'luminosas': 'lumineuses',
        'modernas': 'modernes',
        'cómodas': 'confortables',
        'seguras': 'sûres',
        'limpias': 'propres',
        'Preguntas frecuentes': 'Questions fréquentes',
        'sobre': 'sur',
        'Sí': 'Oui',
        'No': 'Non',
        'todas': 'toutes',
        'todos': 'tous',
        'nuestras': 'nos',
        'nuestros': 'nos',
        'Puedes': 'Vous pouvez',
        'puedes': 'vous pouvez',
        'tenemos': 'nous avons',
        'Tenemos': 'Nous avons',
        'ofrecemos': 'nous offrons',
        'Ofrecemos': 'Nous offrons',
    }

    result = text
    for es_term, fr_term in translations.items():
        # Use word boundaries to avoid partial replacements
        result = re.sub(rf'\b{re.escape(es_term)}\b', fr_term, result)

    return result

# Translate all keys
facilities_fr = {}
for key, value in facilities_es.items():
    facilities_fr[key] = translate_to_french(value)

print(f"Translated {len(facilities_fr)} keys to French")

# Save to JSON
with open('facilities_fr.json', 'w', encoding='utf-8') as f:
    json.dump(facilities_fr, f, ensure_ascii=False, indent=2)

print("Saved to facilities_fr.json")
print("\nSample translations:")
for i, (key, value) in enumerate(list(facilities_fr.items())[:5]):
    es_val = facilities_es[key][:60] + '...' if len(facilities_es[key]) > 60 else facilities_es[key]
    fr_val = value[:60] + '...' if len(value) > 60 else value
    print(f"\n{key}:")
    print(f"  ES: {es_val}")
    print(f"  FR: {fr_val}")
