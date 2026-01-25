#!/usr/bin/env node

/**
 * Script de verificación del backend
 * Ejecutar: node check-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 VERIFICANDO CONFIGURACIÓN DEL BACKEND\n');
console.log('=' .repeat(50));

// Verificar Node.js
console.log('\n✓ Node.js version:', process.version);

// Verificar archivos necesarios
const requiredFiles = ['server.js', '.env', 'package.json', 'script.js'];
const missingFiles = [];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✓ Archivo encontrado: ${file}`);
    } else {
        console.log(`✗ Archivo FALTANTE: ${file}`);
        missingFiles.push(file);
    }
});

// Verificar variables de entorno
console.log('\n' + '='.repeat(50));
console.log('\n📋 VARIABLES DE ENTORNO (.env):\n');

if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    const lines = envContent.split('\n').filter(l => l && !l.startsWith('#'));
    
    lines.forEach(line => {
        const [key] = line.split('=');
        const value = line.includes('=') ? line.split('=')[1] : '';
        const maskedValue = value.length > 0 ? '***' : '(vacío)';
        
        if (value === '' || value.includes('aqui')) {
            console.log(`⚠️  ${key.trim()}: ${maskedValue} - ❌ REQUIERE CONFIGURACIÓN`);
        } else {
            console.log(`✓ ${key.trim()}: ${maskedValue} - ✅ CONFIGURADO`);
        }
    });
} else {
    console.log('✗ Archivo .env no encontrado');
}

// Verificar package.json
console.log('\n' + '='.repeat(50));
console.log('\n📦 DEPENDENCIAS NECESARIAS:\n');

if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = packageJson.dependencies || {};
    
    Object.keys(dependencies).forEach(dep => {
        console.log(`✓ ${dep}: ${dependencies[dep]}`);
    });
} else {
    console.log('✗ package.json no encontrado');
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('\n📊 RESUMEN:\n');

if (missingFiles.length === 0) {
    console.log('✓ Todos los archivos están presentes');
} else {
    console.log(`✗ Faltan ${missingFiles.length} archivo(s)`);
}

console.log('\n📝 PRÓXIMOS PASOS:\n');
console.log('1. Actualizar .env con tus credenciales de Gmail');
console.log('2. Ejecutar: npm install');
console.log('3. Ejecutar: npm start (o npm run dev)');
console.log('4. Visitar: http://localhost:3000/api/test');
console.log('\n' + '='.repeat(50) + '\n');
