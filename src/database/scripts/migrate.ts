import pool from '../config/database';
import * as migration001 from '../migrations/001_create_users_table';
import * as migration002 from '../migrations/002_create_auth_providers_table';
import * as migration003 from '../migrations/003_create_auth_tokens_table';
import * as migration004 from '../migrations/004_create_addresses_table';
import * as migration005 from '../migrations/005_create_categories_table';
import * as migration006 from '../migrations/006_create_brands_table';
import * as migration007 from '../migrations/007_create_products_table';
import * as migration008 from '../migrations/008_create_product_attributes_table';
import * as migration009 from '../migrations/009_create_attribute_values_table';
import * as migration010 from '../migrations/010_create_product_variants_table';
import * as migration011 from '../migrations/011_create_variant_attributes_table';
import * as migration012 from '../migrations/012_create_product_images_table';
import * as migration013 from '../migrations/013_create_inventory_table';
import * as migration014 from '../migrations/014_create_suppliers_table';
import * as migration015 from '../migrations/015_create_supplier_orders_table';
import * as migration016 from '../migrations/016_create_carts_table';
import * as migration017 from '../migrations/017_create_cart_items_table';
import * as migration018 from '../migrations/018_create_coupons_table';
import * as migration019 from '../migrations/019_create_orders_table';
import * as migration020 from '../migrations/020_create_order_items_table';
import * as migration021 from '../migrations/021_create_shipments_table';
import * as migration022 from '../migrations/022_create_invoices_table';
import * as migration023 from '../migrations/023_create_payments_table';
import * as migration024 from '../migrations/024_create_reviews_table';
import * as migration025 from '../migrations/025_create_wishlists_table';
import * as migration026 from '../migrations/026_create_wishlist_items_table';
import * as migration027 from '../migrations/027_create_notifications_table';

const migrations = [
  { name: '001_create_users_table', ...migration001 },
  { name: '002_create_auth_providers_table', ...migration002 },
  { name: '003_create_auth_tokens_table', ...migration003 },
  { name: '004_create_addresses_table', ...migration004 },
  { name: '005_create_categories_table', ...migration005 },
  { name: '006_create_brands_table', ...migration006 },
  { name: '007_create_products_table', ...migration007 },
  { name: '008_create_product_attributes_table', ...migration008 },
  { name: '009_create_attribute_values_table', ...migration009 },
  { name: '010_create_product_variants_table', ...migration010 },
  { name: '011_create_variant_attributes_table', ...migration011 },
  { name: '012_create_product_images_table', ...migration012 },
  { name: '013_create_inventory_table', ...migration013 },
  { name: '014_create_suppliers_table', ...migration014 },
  { name: '015_create_supplier_orders_table', ...migration015 },
  { name: '016_create_carts_table', ...migration016 },
  { name: '017_create_cart_items_table', ...migration017 },
  { name: '018_create_coupons_table', ...migration018 },
  { name: '019_create_orders_table', ...migration019 },
  { name: '020_create_order_items_table', ...migration020 },
  { name: '021_create_shipments_table', ...migration021 },
  { name: '022_create_invoices_table', ...migration022 },
  { name: '023_create_payments_table', ...migration023 },
  { name: '024_create_reviews_table', ...migration024 },
  { name: '025_create_wishlists_table', ...migration025 },
  { name: '026_create_wishlist_items_table', ...migration026 },
  { name: '027_create_notifications_table', ...migration027 },
];

export const runMigrations = async () => {
  console.log('🚀 Running migrations...\n');
  
  try {
    for (const migration of migrations) {
      console.log(`📝 Running: ${migration.name}`);
      await migration.up();
    }
    
    console.log('\n🎉 All migrations executed successfully');
  } catch (error) {
    console.error('\n❌ Error running migrations:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

runMigrations();
