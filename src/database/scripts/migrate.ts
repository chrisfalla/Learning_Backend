import pool from '../config/database';
import * as migration001 from '../migrations/001_create_usuarios_table';
import * as migration002 from '../migrations/002_create_proveedores_autenticacion_table';
import * as migration003 from '../migrations/003_create_tokens_autenticacion_table';
import * as migration004 from '../migrations/004_create_direcciones_table';
import * as migration005 from '../migrations/005_create_categorias_table';
import * as migration006 from '../migrations/006_create_marcas_table';
import * as migration007 from '../migrations/007_create_productos_table';
import * as migration008 from '../migrations/008_create_atributos_producto_table';
import * as migration009 from '../migrations/009_create_valores_atributo_table';
import * as migration010 from '../migrations/010_create_variantes_producto_table';
import * as migration011 from '../migrations/011_create_variantes_atributos_table';
import * as migration012 from '../migrations/012_create_imagenes_producto_table';
import * as migration013 from '../migrations/013_create_inventario_table';
import * as migration014 from '../migrations/014_create_proveedores_table';
import * as migration015 from '../migrations/015_create_ordenes_proveedor_table';
import * as migration016 from '../migrations/016_create_carritos_table';
import * as migration017 from '../migrations/017_create_items_carrito_table';
import * as migration018 from '../migrations/018_create_cupones_table';
import * as migration019 from '../migrations/019_create_ordenes_table';
import * as migration020 from '../migrations/020_create_items_orden_table';
import * as migration021 from '../migrations/021_create_envios_table';
import * as migration022 from '../migrations/022_create_facturas_table';
import * as migration023 from '../migrations/023_create_pagos_table';
import * as migration024 from '../migrations/024_create_resenas_table';
import * as migration025 from '../migrations/025_create_wishlists_table';
import * as migration026 from '../migrations/026_create_wishlist_items_table';
import * as migration027 from '../migrations/027_create_notificaciones_table';

const migrations = [
  { name: '001_create_usuarios_table', ...migration001 },
  { name: '002_create_proveedores_autenticacion_table', ...migration002 },
  { name: '003_create_tokens_autenticacion_table', ...migration003 },
  { name: '004_create_direcciones_table', ...migration004 },
  { name: '005_create_categorias_table', ...migration005 },
  { name: '006_create_marcas_table', ...migration006 },
  { name: '007_create_productos_table', ...migration007 },
  { name: '008_create_atributos_producto_table', ...migration008 },
  { name: '009_create_valores_atributo_table', ...migration009 },
  { name: '010_create_variantes_producto_table', ...migration010 },
  { name: '011_create_variantes_atributos_table', ...migration011 },
  { name: '012_create_imagenes_producto_table', ...migration012 },
  { name: '013_create_inventario_table', ...migration013 },
  { name: '014_create_proveedores_table', ...migration014 },
  { name: '015_create_ordenes_proveedor_table', ...migration015 },
  { name: '016_create_carritos_table', ...migration016 },
  { name: '017_create_items_carrito_table', ...migration017 },
  { name: '018_create_cupones_table', ...migration018 },
  { name: '019_create_ordenes_table', ...migration019 },
  { name: '020_create_items_orden_table', ...migration020 },
  { name: '021_create_envios_table', ...migration021 },
  { name: '022_create_facturas_table', ...migration022 },
  { name: '023_create_pagos_table', ...migration023 },
  { name: '024_create_resenas_table', ...migration024 },
  { name: '025_create_wishlists_table', ...migration025 },
  { name: '026_create_wishlist_items_table', ...migration026 },
  { name: '027_create_notificaciones_table', ...migration027 },
];

export const runMigrations = async () => {
  console.log('🚀 Ejecutando migraciones...\n');
  
  try {
    for (const migration of migrations) {
      console.log(`📝 Ejecutando: ${migration.name}`);
      await migration.up();
    }
    
    console.log('\n🎉 Todas las migraciones ejecutadas exitosamente');
  } catch (error) {
    console.error('\n❌ Error ejecutando migraciones:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

runMigrations();
