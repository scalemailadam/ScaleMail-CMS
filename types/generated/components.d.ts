import type { Schema, Struct } from '@strapi/strapi';

export interface ContentContentItems extends Struct.ComponentSchema {
  collectionName: 'components_content_content_items';
  info: {
    description: 'The image files attached to a sub-item (e.g. the full design images for a garment).';
    displayName: 'Image Files';
    icon: 'attachment';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface FolderItemItems extends Struct.ComponentSchema {
  collectionName: 'components_folder_item_items';
  info: {
    description: "One item inside a desktop folder. Set 'url' to link out to a website, or set 'modalSlug' to open a window. Valid modalSlug values: openFolder (Finder), browserModal (browser popup), resumeModal (PDF/resume viewer), garmentDesignModal (image gallery), textModal (rich text document), imageFolderModal (image sub-folder), pictureModal (single image). Leave both empty and add Sub-Items to create a nested folder.";
    displayName: 'Folder Item';
    icon: 'calendar';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    reactIcon: Schema.Attribute.String;
    reactIconColor: Schema.Attribute.String;
    richContent: Schema.Attribute.RichText;
    subItem: Schema.Attribute.Component<'navigation.items', true>;
    textColor: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationDockItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_dock_items';
  info: {
    description: "One icon in the bottom dock. Set 'url' to open a website, or 'modalSlug' to open a window (e.g. openFolder, browserModal, resumeModal, garmentDesignModal).";
    displayName: 'Dock Icon';
    icon: 'oneToOne';
  };
  attributes: {
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    reactIcon: Schema.Attribute.String;
    reactIconColor: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationItems extends Struct.ComponentSchema {
  collectionName: 'components_navigation_items';
  info: {
    description: "One item in a top-bar dropdown menu or a sub-item inside a folder. Fill in 'url' to link to a website, or 'modalSlug' to open a window.";
    displayName: 'Dropdown Menu Item';
    icon: 'dashboard';
  };
  attributes: {
    contentItems: Schema.Attribute.Component<'content.content-items', false>;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    modalSlug: Schema.Attribute.String;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationMenu extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menus';
  info: {
    description: "One dropdown menu in the top bar (e.g. 'File', 'About'). Add items below for each option in the dropdown.";
    displayName: 'Top Bar Menu';
    icon: 'stack';
  };
  attributes: {
    items: Schema.Attribute.Component<'navigation.items', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_navigation_social_links';
  info: {
    description: "One social media icon in the top-right of the header. 'iconName' must be a valid react-icons name e.g. Github, X, Linkedin, Instagram.";
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    iconName: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductColorVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_color_variants';
  info: {
    description: "One color option for a product. 'Image' is the single swatch thumbnail shown on the product card. 'Images' is the full gallery shown when this color is selected on the product page.";
    displayName: 'Color Variant';
    icon: 'paint-brush';
  };
  attributes: {
    hex: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    images: Schema.Attribute.Media<'images', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallery_sections';
  info: {
    description: 'A grid of images. Set columns/rows to control the layout.';
    displayName: 'Gallery \u2014 Image Grid';
    icon: 'apps';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    columns: Schema.Attribute.Integer;
    gap: Schema.Attribute.Integer;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    rows: Schema.Attribute.Integer;
  };
}

export interface SectionsHeadingSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_heading_sections';
  info: {
    description: 'A title or heading line. Choose size (h1\u2013h6), color, and alignment.';
    displayName: 'Heading';
    icon: 'bulletList';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    color: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    textSize: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    >;
  };
}

export interface SectionsImageSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_sections';
  info: {
    description: 'One image with optional width, height, and alignment.';
    displayName: 'Single Image';
    icon: 'crop';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    height: Schema.Attribute.Integer;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    width: Schema.Attribute.Integer;
  };
}

export interface SectionsRichTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_text_sections';
  info: {
    description: 'A block of rich text. Supports bold, italic, lists, and links.';
    displayName: 'Text Paragraph';
    icon: 'code';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    paragraphText: Schema.Attribute.Blocks;
    placement: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
  };
}

export interface SectionsSectionGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_groups';
  info: {
    description: 'Sets a background color for the sections that follow it. Enter a hex color like #1a1a2e.';
    displayName: 'Background Color Block';
    icon: 'apps';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
  };
}

export interface SettingsBackgroundOption extends Struct.ComponentSchema {
  collectionName: 'components_settings_background_options';
  info: {
    description: 'A background theme option for the Appearance settings';
    displayName: 'Background Option';
    icon: 'palette';
  };
  attributes: {
    baseColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#102630'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    previewColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#1e3a4a'>;
    strokeColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#2a0e0e'>;
    themeKey: Schema.Attribute.String & Schema.Attribute.Required;
    tipColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#355566'>;
  };
}

export interface SettingsSidebarItem extends Struct.ComponentSchema {
  collectionName: 'components_settings_sidebar_items';
  info: {
    description: 'A sidebar navigation item for the System Settings modal';
    displayName: 'Sidebar Item';
    icon: 'list';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    reactIcon: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.content-items': ContentContentItems;
      'folder-item.items': FolderItemItems;
      'navigation.dock-item': NavigationDockItem;
      'navigation.items': NavigationItems;
      'navigation.menu': NavigationMenu;
      'navigation.social-links': NavigationSocialLinks;
      'product.color-variant': ProductColorVariant;
      'sections.gallery-section': SectionsGallerySection;
      'sections.heading-section': SectionsHeadingSection;
      'sections.image-section': SectionsImageSection;
      'sections.rich-text-section': SectionsRichTextSection;
      'sections.section-group': SectionsSectionGroup;
      'settings.background-option': SettingsBackgroundOption;
      'settings.sidebar-item': SettingsSidebarItem;
    }
  }
}
