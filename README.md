# Personal Budget API

API para la gestión de presupuestos personales mediante el sistema de sobres, permitiendo a los usuarios realizar un seguimiento de sus gastos y ver su balance disponible por categoría.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Documentación de la API](#documentación-de-la-api)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción
Este proyecto permite a los usuarios organizar su presupuesto personal a través de un sistema de sobres o categorías. Cada sobre tiene un límite de gasto, y se pueden realizar transacciones para registrar los gastos realizados en cada uno.

## Características
- Crear, actualizar y eliminar sobres de presupuesto.
- Registrar transacciones en los sobres.
- Consultar el balance de cada sobre en cualquier momento.
- API RESTful para acceder y gestionar los sobres.

## Requisitos
- **Lenguaje:** Node.js >= 14.x
- **Dependencias:** npm >= 6.x
- **Framework:** Express

## Instalación
1. Clona el repositorio y navega al directorio del proyecto:
   ```bash
   git clone https://github.com/pruden96/personal-budget-api.git
   cd personal-budget-api
