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
   
## Documentación de la API
### Endpoints
- **GET /api/envelopes**: Obtiene todos los sobres.
- **GET /api/envelopes/:id**: Obtiene un sobre específico por ID.
- **POST /api/envelopes**: Crea un nuevo sobre. Requiere `name` y `limit`.
  - **Ejemplo de solicitud JSON**:
    ```json
    {
      "name": "Utilities",
      "limit": 300
    }
    ```
- **POST /api/envelopes/:id**: Registra una transacción. Requiere `amount` y `description`.
  - **Ejemplo de solicitud JSON para transacción**:
    ```json
    {
      "amount": 50,
      "description": "Electric bill"
    }
    ```
- **PUT /api/envelopes/:id**: Actualiza un sobre. Requiere `name` y `limit`.
  - **Ejemplo de solicitud JSON**:
    ```json
    {
      "name": "Entretaiment",
      "limit": 1300
    }
    ```
- **PUT /api/envelopes/:id/transactions/:transactionId/:targetId**: Mueve una transacción de un sobre fuente a un sobre destino.
  - **Ejemplo de respuesta JSON**:
    ```json
    {
      "name": "Entretaiment",
      "limit": 1300,
      "spent": 500,
      "balance": 800,
      "transactions": [<NEW_TRANSACTION>]
    }
    ```

- **DELETE /api/envelopes/:id**: Elimina un sobre.
  - **Ejemplo de respuesta JSON**:
    ```json
    {
      "name": <envelope's_name>,
      "status": "DELETED"
      "Date": <DATE> 
    }
    ```
- **DELETE /api/envelopes/:id/transactions/:transactionId**: Elimina una transacción de un sobre.
  - **Ejemplo de respuesta**:
    STATUS: 204


  

Cada solicitud se maneja en el archivo `envelopes.js` mediante la integración de `Express.js` y un sistema modular para la base de datos en `db.js` que simula una base de datos en memoria con sobres predefinidos.

## Contribuciones
Si deseas contribuir, por favor, abre un issue o envía un pull request con una breve descripción de los cambios que propones.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

