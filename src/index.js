'use strict';

// LiquidEther fluid-background palettes for the Appearance settings.
// Each option is a 3-stop palette: deep base -> saturated mid -> bright
// high-velocity accent. Mirrored in the frontend fallbacks (ThemeContext /
// SystemSettingsModal) so the look is identical with or without CMS data.
const DEFAULT_BACKGROUND_OPTIONS = [
  { label: 'Arcane Magic',    themeKey: 'dark-blue',   color1: '#160d3a', color2: '#3d5cff', color3: '#8be9ff' },
  { label: 'Molten Lava',     themeKey: 'light-red',   color1: '#3a0d07', color2: '#e23d11', color3: '#ffd24a' },
  { label: 'Platinum Chrome', themeKey: 'white',       color1: '#4a5560', color2: '#b8c2cf', color3: '#f5f9ff' },
  { label: 'Obsidian Void',   themeKey: 'black',       color1: '#070709', color2: '#20202e', color3: '#58506f' },
  { label: 'Verdant Aurora',  themeKey: 'antigravity', color1: '#06140d', color2: '#2f8f57', color3: '#9dffb0' },
  { label: 'Royal Amethyst',  themeKey: 'amethyst',    color1: '#1e0b35', color2: '#7b2ff7', color3: '#d59bff' },
  { label: 'Ember Gold',      themeKey: 'ember-gold',  color1: '#2a1602', color2: '#c8881a', color3: '#ffe08a' },
];

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Seeds the System Settings appearance palettes when none are usable yet.
   * Idempotent and migration-safe: skips when Background Options with real
   * color data already exist (seeded or edited in the admin), but DOES replace
   * blank/stale entries left over from the tipColor->color1/2/3 schema change.
   */
  async bootstrap({ strapi }) {
    const uid = 'api::system-settings.system-settings';
    try {
      const existing = await strapi
        .documents(uid)
        .findFirst({ populate: ['backgroundOptions'] });

      // Usable = at least one option that actually carries a color value.
      // Blank leftovers (no color1) are treated as stale and reseeded.
      const hasUsableOptions =
        existing &&
        Array.isArray(existing.backgroundOptions) &&
        existing.backgroundOptions.some((o) => o && o.color1);

      if (hasUsableOptions) return;

      if (existing) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          data: { backgroundOptions: DEFAULT_BACKGROUND_OPTIONS },
          status: 'published',
        });
      } else {
        await strapi.documents(uid).create({
          data: { backgroundOptions: DEFAULT_BACKGROUND_OPTIONS },
          status: 'published',
        });
      }

      strapi.log.info(
        `[seed] Populated ${DEFAULT_BACKGROUND_OPTIONS.length} background palette options.`
      );
    } catch (err) {
      strapi.log.error(`[seed] Failed to seed background palette options: ${err.message}`);
    }
  },
};
