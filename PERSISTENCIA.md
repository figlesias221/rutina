# Sistema de Persistencia - Rutina App

## 📍 **Ubicación de los Datos**

Los datos de tu rutina semanal se guardan en:
```
/rutina/db.json
```

## 🔄 **Cómo Funciona**

### **Estructura del Archivo**
```json
{
  "weeklyPlan": {
    "name": "Plan Semanal Rutina + Cardio",
    "days": [
      {
        "id": "monday",
        "name": "Día 1 – Piernas", 
        "dayOfWeek": "Lunes",
        "gymExercises": [...],
        "cardioActivities": [...]
      }
      // ... resto de días
    ]
  }
}
```

### **API Endpoints**
- **GET** `/api/weekly-plan` - Carga el plan semanal
- **POST** `/api/weekly-plan` - Guarda cambios al plan

### **Persistencia Automática**
- Los cambios se guardan automáticamente con 1 segundo de delay (debounced)
- Si hay errores de conexión, se muestra un mensaje pero los datos no se pierden
- El estado se mantiene en memoria hasta que se pueda guardar

## 🛠️ **Backup y Restauración**

### **Hacer Backup Manual**
```bash
cp db.json db.backup.json
```

### **Restaurar desde Backup**
```bash
cp db.backup.json db.json
```

### **Reset a Valores Por Defecto**
Elimina el archivo `db.json` y la app recreará los datos por defecto:
```bash
rm db.json
```

## 🔧 **Troubleshooting**

### **Si la App No Carga**
1. Verifica que `db.json` existe
2. Verifica que el formato JSON es válido
3. Si está corrupto, elimínalo para recrear valores por defecto

### **Si Los Cambios No Se Guardan**
1. Revisa la consola del navegador por errores
2. Verifica permisos de escritura en el directorio
3. Los cambios se intentarán guardar cada vez que modifiques algo

## 📁 **Estructura de Datos**

### **Ejercicio de Gimnasio**
```typescript
{
  name: string;          // "Sentadilla con Barra"
  setsReps: string;      // "4x5"
  weight?: string;       // "80-85% 1RM"
  comments?: string;     // "RIR 0-1"
}
```

### **Actividad de Cardio**
```typescript
{
  type: CardioType;      // "zone2-run" | "football" | "tennis" | "vo2-training" | "rest"
  duration?: string;     // "45 min"
  intensity?: string;    // "Zona 2"
  notes?: string;        // "Mantener FC entre 140-150"
}
```

## 🚀 **Ventajas del Sistema**

✅ **Persistencia Real**: Los datos se guardan en archivo, no solo en memoria del navegador  
✅ **Backup Fácil**: Puedes copiar el archivo `db.json` para hacer respaldo  
✅ **Editable**: Puedes editar directamente el JSON si necesitas cambios masivos  
✅ **Portabilidad**: Puedes copiar tu rutina a otra instalación  
✅ **Versionable**: Puedes usar Git para versionar cambios en tu rutina  

## 📝 **Migración desde localStorage**

Si tenías datos en localStorage (versión anterior), estos se han perdido. La nueva versión solo usa el archivo `db.json`. Esto es más confiable y permite backups reales.
